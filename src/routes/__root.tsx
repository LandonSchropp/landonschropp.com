import flannel from "../images/flannel.png";
import stylesheetsIndex from "../styles/index.css?url";
import { DynamicSVG } from "@/components/dynamic-svg";
import { NAME } from "@/constants";
import { notFound } from "@/data/svg";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: NAME,
      },
      {
        name: "description",
        content: `${NAME} is a developer, designer and entrepreneur based in Portland, OR.`,
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital,wght@0,400;0,700;" +
          "1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=Source+" +
          "Code+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap",
        rel: "stylesheet",
      },
      {
        rel: "shortcut icon",
        type: "image/png",
        href: flannel,
      },
      {
        rel: "stylesheet",
        href: stylesheetsIndex,
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return (
    <html lang="en-us" className="h-full text-[19px] md:text-[21px] lg:text-[22px]">
      <head>
        <HeadContent />
      </head>
      <body
        className={
          "bg-theme-background flex h-full flex-col font-serif font-normal " +
          "text-theme-text *:flex-[0_0_auto]"
        }
      >
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

export function NotFoundPage() {
  return (
    <DynamicSVG>
      <DynamicSVG.Aspect key="not-found" minSpacing={0} maxSpacing={0}>
        <DynamicSVG.Group title="404: Not Found" key="heading" role="heading">
          <DynamicSVG.Row key="heading" align="top" spacing={0}>
            <DynamicSVG.Shape key="not-found" {...notFound} />
          </DynamicSVG.Row>
        </DynamicSVG.Group>
      </DynamicSVG.Aspect>
    </DynamicSVG>
  );
}
