import { MainNavigation } from "../components/navigation/main-navigation";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned")({
  component: TodayILearnedLayout,
});

function TodayILearnedLayout() {
  return (
    <>
      <MainNavigation />
      <main className="prose mx-auto w-[70ch] max-w-full px-2 md:px-4">
        <Outlet />
      </main>
    </>
  );
}
