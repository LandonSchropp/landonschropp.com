import { TodayILearnedHeader } from "../../components/today-i-learned/today-i-learned-header";
import { NAME } from "../../constants";
import { fetchTodayILearned } from "../../data/today-i-learned";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/$slug")({
  loader: async ({ params }) => await fetchTodayILearned({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    return {
      meta: [
        {
          title: loaderData.title,
        },
        {
          name: "description",
          content: `${NAME}'s TIL on ${loaderData.title}`,
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
