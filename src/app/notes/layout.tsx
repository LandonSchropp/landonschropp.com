import { MainNavigation } from "@/components/navigation/main-navigation";

type ContentLayoutProps = {
  children: React.ReactNode;
};

export default function NotesLayout({ children }: ContentLayoutProps) {
  return (
    <>
      <MainNavigation />
      <main className="prose mx-auto w-[70ch] max-w-full px-2 md:px-4">
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
}
