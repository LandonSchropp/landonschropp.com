import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { render, RenderOptions, RenderResult, waitFor } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

type RenderWithRouterOptions = {
  initialLocation?: string;
} & Omit<RenderOptions, "wrapper">;

/**
 * Router wrapper component for use with testing.
 * Provides router context without requiring the full app route tree.
 */
function TestRouterProvider({
  initialLocation = "/",
  children,
}: {
  initialLocation?: string;
  children: ReactNode;
}) {
  // Create an in-memory history for testing.
  const history = createMemoryHistory({ initialEntries: [initialLocation] });

  // Create a simple root route for testing that renders the children.
  const routeTree = createRootRoute({ component: () => children });

  // Create the router with the test route tree and memory history. Use defaultPendingMinMs of 0 to
  // avoid delays in tests.
  const router = createRouter({ routeTree, defaultPendingMinMs: 0, history });

  // Render the RouterProvider with the test router.
  return <RouterProvider router={router} />;
}

/**
 * Custom render function that wraps components in a RouterProvider with a test router. This allows
 * testing components that use TanStack Router hooks and components (like Link).
 *
 * @param component The React element to render.
 * @param options Additional render options, including `initialLocation` for the router.
 * @returns The render result from React Testing Library.
 */
export async function renderWithRouter(
  component: ReactElement,
  { initialLocation = "/", ...options }: RenderWithRouterOptions = {},
): Promise<RenderResult> {
  // Render the component within the TestRouterProvider
  const result = render(
    <TestRouterProvider initialLocation={initialLocation}>{component}</TestRouterProvider>,
    options,
  );

  // TanStack Router renders async, so we _must_ wait for it here.
  await waitFor(() => expect(document.body).toBeInTheDocument());

  // Return the render result for use in tests.
  return result;
}
