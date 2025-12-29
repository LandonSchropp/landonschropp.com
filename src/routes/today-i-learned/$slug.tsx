import { TodayILearnedHeader } from "../../components/today-i-learned/today-i-learned-header";
import { NAME } from "../../constants";
import { fetchTodayILearnedServerFn } from "../../data/today-i-learned";
import { stripHtmlTags } from "../../utilities/markdown";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/$slug")({
  loader: async ({ params }) => await fetchTodayILearnedServerFn({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    return {
      meta: [
        {
          title: stripHtmlTags(loaderData.title),
        },
        {
          name: "description",
          content: `${NAME}'s TIL on ${stripHtmlTags(loaderData.title)}`,
        },
        {
          name: "author",
          content: NAME,
        },
      ],
    };
  },
  component: TodayILearnedPage,
});

function TodayILearnedPage() {
  const todayILearned = Route.useLoaderData();

  return (
    <article className="my-6">
      <TodayILearnedHeader todayILearned={todayILearned} />
      <section className="prose" dangerouslySetInnerHTML={{ __html: todayILearned.content }} />
    </article>
  );
}
