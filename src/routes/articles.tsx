import { ContentLayout } from "./-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/articles")({
  component: ArticlesLayout,
});

function ArticlesLayout() {
  return (
    <ContentLayout>
      <Outlet />
    </ContentLayout>
  );
}
