import { Header } from "../../components/content/header";
import { NoteSummary } from "../../components/notes/note-summary";
import { fetchNotes } from "../../data/notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/")({
  loader: async () => await fetchNotes(),
  head: () => ({
    meta: [
      {
        title: "Notes",
      },
      {
        name: "description",
        content: "My personal notes on books, articles, talks, podcasts and more.",
      },
    ],
  }),
  component: NotePage,
});

function NotePage() {
  const notes = Route.useLoaderData();

  return (
    <>
      <Header
        title="Notes"
        subText="My personal notes on books, articles, talks, podcasts and more."
      />
      <section className="my-8">
        {notes.map((note) => (
          <NoteSummary key={note.slug} note={note} />
        ))}
      </section>
    </>
  );
}
