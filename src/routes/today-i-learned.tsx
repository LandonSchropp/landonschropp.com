import { ContentLayout } from "./-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned")({
  component: TodayILearnedLayout,
});

function TodayILearnedLayout() {
  return (
    <ContentLayout>
      <Outlet />
    </ContentLayout>
  );
}
