import { MainNavigation } from "../components/navigation/main-navigation";

export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main className="mx-auto w-[70ch] max-w-full px-2 md:px-4">{children}</main>
    </>
  );
}
