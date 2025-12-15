import { ContentLayout } from "./-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/notes")({
  component: NotesLayout,
});

function NotesLayout() {
  return (
    <ContentLayout>
      <Outlet />
    </ContentLayout>
  );
}
