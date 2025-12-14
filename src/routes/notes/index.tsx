import { Header } from "../../components/content/header";
import { Tag } from "../../components/content/tag";
import { NoteSummary } from "../../components/notes/note-summary";
import { fetchNotes } from "../../data/notes";
import { TagSearchSchema } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/")({
  validateSearch: TagSearchSchema,
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: async ({ deps: { tag } }) => {
    const notes = await fetchNotes();
    return tag ? notes.filter(({ tags }) => tags.includes(tag)) : notes;
  },
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
  const { tag } = Route.useSearch();

  return (
    <>
      <Header
        title="Notes"
        subtitle="My personal notes on books, articles, talks, podcasts and more."
        tags={tag ? [<Tag key={tag} name={tag} href="/notes" />] : undefined}
      />
      <section className="my-8">
        {notes.map((note, index) => (
          <NoteSummary key={note.slug} note={note} index={index} count={notes.length} />
        ))}
      </section>
    </>
  );
}
