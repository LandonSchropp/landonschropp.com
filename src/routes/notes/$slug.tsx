import { NoteEmbed } from "../../components/notes/note-embed";
import { NoteHeader } from "../../components/notes/note-header";
import { NAME } from "../../constants";
import { fetchNote } from "../../data/notes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/$slug")({
  loader: async ({ params }) => await fetchNote({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    return {
      meta: [
        {
          title: loaderData.title,
        },
        {
          name: "description",
          content: `${NAME}'s notes about ${loaderData.title}`,
        },
        {
          name: "author",
          content: NAME,
        },
      ],
    };
  },
  component: NotePage,
});

function NotePage() {
  const note = Route.useLoaderData();

  return (
    <article className="my-6">
      <NoteHeader note={note} />
      <NoteEmbed note={note} />
      <section className="prose" dangerouslySetInnerHTML={{ __html: note.content }} />
    </article>
  );
}
