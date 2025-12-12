import { NoteEmbed } from "../../components/notes/note-embed";
import { NoteHeader } from "../../components/notes/note-header";
import { NAME } from "../../constants";
import { fetchContent } from "../../data/content";
import { fetchEnvironmentVariable } from "../../env";
import { parseNote } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/$slug")({
  loader: async ({ params }) =>
    await fetchContent(fetchEnvironmentVariable("NOTES_PATH"), params.slug, parseNote),
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
