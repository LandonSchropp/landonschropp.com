import { Header } from "../../components/content/header";
import { TagDropdown } from "../../components/content/tag-dropdown";
import { NoteSummary } from "../../components/notes/note-summary";
import { getAllTags } from "../../data/content";
import { fetchNotesServerFn } from "../../data/notes";
import type { Note } from "../../types/notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/")({
  loader: async () => {
    const notes = await fetchNotesServerFn();

    return {
      notes,
      tags: getAllTags(notes),
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
  component: function NotesIndexPage() {
    const { notes, tags } = Route.useLoaderData();
    return <NotesPage notes={notes} tags={tags} />;
  },
});

type NotesPageProps = {
  notes: Note[];
  tags: string[];
  selectedTag?: string;
};

export function NotesPage({ notes, tags, selectedTag }: NotesPageProps) {
  return (
    <>
      <Header
        title="Notes"
        subtitle="My personal notes on books, articles, talks, podcasts and more."
        tags={[
          <TagDropdown
            key="tag-dropdown"
            tags={tags}
            selectedTag={selectedTag}
            basePath="/notes"
          />,
        ]}
      />
      <section className="my-8">
        {notes.map((note, index) => (
          <NoteSummary key={note.slug} note={note} index={index} count={notes.length} />
        ))}
      </section>
    </>
  );
}
