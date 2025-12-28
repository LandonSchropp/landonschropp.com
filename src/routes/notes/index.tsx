import { Header } from "../../components/content/header";
import { TagDropdown } from "../../components/content/tag-dropdown";
import { NoteSummary } from "../../components/notes/note-summary";
import { filterContentsByTag, getAllTags } from "../../data/content";
import { fetchNotesServerFn } from "../../data/notes";
import { TagSearchSchema } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/")({
  validateSearch: TagSearchSchema,
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: async ({ deps: { tag } }) => {
    const notes = await fetchNotesServerFn();

    return {
      notes: filterContentsByTag(notes, tag),
      allTags: getAllTags(notes),
    };
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
  const { notes, allTags } = Route.useLoaderData();

  return (
    <>
      <Header
        title="Notes"
        subtitle="My personal notes on books, articles, talks, podcasts and more."
        tags={[<TagDropdown key="tag-dropdown" tags={allTags} />]}
      />
      <section className="my-8">
        {notes.map((note, index) => (
          <NoteSummary key={note.slug} note={note} index={index} count={notes.length} />
        ))}
      </section>
    </>
  );
}
