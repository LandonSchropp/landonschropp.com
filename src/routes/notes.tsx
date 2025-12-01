import { MainNavigation } from "../components/navigation/main-navigation";
import { createFileRoute, Outlet } from "@tanstack/react-router";

// TODO: Figure out how to share this layout with the other content layouts.
export const Route = createFileRoute("/notes")({
  component: NotesLayout,
});

export default function NotesLayout() {
  return (
    <>
      <MainNavigation />
      <main className="mx-auto w-[70ch] max-w-full px-2 md:px-4">
        <Outlet />
      </main>
    </>
  );
}
