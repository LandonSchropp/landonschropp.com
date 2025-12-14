import { Header } from "../../components/content/header";
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

  const headerTagProps = tag
    ? {
        tags: [tag],
        tagsIndexHref: "/notes",
      }
    : {};

  return (
    <>
      <Header
        title="Notes"
        subtitle="My personal notes on books, articles, talks, podcasts and more."
        {...headerTagProps}
      />
      <section className="my-8">
        {notes.map((note, index) => (
          <NoteSummary key={note.slug} note={note} index={index} count={notes.length} />
        ))}
      </section>
    </>
  );
}
