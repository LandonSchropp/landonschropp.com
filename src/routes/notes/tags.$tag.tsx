import { filterContentsByTag, getAllTags } from "../../data/content";
import { fetchNotesServerFn } from "../../data/notes";
import { NotesPage } from "./index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/tags/$tag")({
  loader: async ({ params: { tag } }) => {
    const notes = await fetchNotesServerFn();

    return {
      notes: filterContentsByTag(notes, tag),
      tags: getAllTags(notes),
      tag,
    };
  },
  head: ({ params: { tag } }) => ({
    meta: [
      {
        title: `Notes - #${tag}`,
      },
      {
        name: "description",
        content: "My personal notes on books, articles, talks, podcasts and more.",
      },
    ],
  }),
  component: function NotesTagPage() {
    const { notes, tags, tag } = Route.useLoaderData();
    return <NotesPage notes={notes} tags={tags} selectedTag={tag} />;
  },
});
