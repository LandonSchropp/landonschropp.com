import { filterContentsByTag, getAllTags } from "../../data/content";
import { fetchTodayILearnedsServerFn } from "../../data/today-i-learned";
import { TodayILearnedPage } from "./index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/tags/$tag")({
  loader: async ({ params: { tag } }) => {
    const todayILearneds = await fetchTodayILearnedsServerFn();

    return {
      todayILearneds: filterContentsByTag(todayILearneds, tag),
      tags: getAllTags(todayILearneds),
      tag,
    };
  },
  head: ({ params: { tag } }) => ({
    meta: [
      {
        title: `Today I Learned - #${tag}`,
      },
      {
        name: "description",
        content: "Language and framework tips and tricks",
      },
    ],
  }),
  component: function TodayILearnedTagPage() {
    const { todayILearneds, tags, tag } = Route.useLoaderData();
    return <TodayILearnedPage todayILearneds={todayILearneds} tags={tags} selectedTag={tag} />;
  },
});
