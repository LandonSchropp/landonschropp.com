import { Header } from "../../components/content/header";
import { TagDropdown } from "../../components/content/tag-dropdown";
import { TodayILearnedSummary } from "../../components/today-i-learned/today-i-learned-summary";
import { filterContentsByTag, getAllTags } from "../../data/content";
import { fetchTodayILearnedsServerFn } from "../../data/today-i-learned";
import { TagSearchSchema } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/")({
  validateSearch: TagSearchSchema,
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: async ({ deps: { tag } }) => {
    const todayILearneds = await fetchTodayILearnedsServerFn();

    return {
      todayILearneds: filterContentsByTag(todayILearneds, tag),
      allTags: getAllTags(todayILearneds),
    };
  },
  head: () => ({
    meta: [
      {
        title: "Today I Learned",
      },
      {
        name: "description",
        content: "Language and framework tips and tricks I've learned while coding",
      },
    ],
  }),
  component: TodayILearnedPage,
});

function TodayILearnedPage() {
  const { todayILearneds, allTags } = Route.useLoaderData();
  const { tag } = Route.useSearch();

  return (
    <>
      <Header
        title="Today I Learned"
        subtitle="Language and framework tips and tricks I've learned while coding"
        tags={[<TagDropdown key="tag-dropdown" tags={allTags} selectedTag={tag} />]}
      />
      <section className="my-8">
        {todayILearneds.map((todayILearned, index) => (
          <TodayILearnedSummary
            key={todayILearned.slug}
            todayILearned={todayILearned}
            index={index}
            count={todayILearneds.length}
          />
        ))}
      </section>
    </>
  );
}
