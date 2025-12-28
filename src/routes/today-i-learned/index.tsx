import { Header } from "../../components/content/header";
import { TagDropdown } from "../../components/content/tag-dropdown";
import { TodayILearnedSummary } from "../../components/today-i-learned/today-i-learned-summary";
import { getAllTags } from "../../data/content";
import { fetchTodayILearnedsServerFn } from "../../data/today-i-learned";
import type { TodayILearned } from "../../types/today-i-learned";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/")({
  loader: async () => {
    const todayILearneds = await fetchTodayILearnedsServerFn();

    return {
      todayILearneds,
      tags: getAllTags(todayILearneds),
    };
  },
  head: () => ({
    meta: [
      {
        title: "Today I Learned",
      },
      {
        name: "description",
        content: "Language and framework tips and tricks",
      },
    ],
  }),
  component: function TodayILearnedIndexPage() {
    const { todayILearneds, tags } = Route.useLoaderData();
    return <TodayILearnedPage todayILearneds={todayILearneds} tags={tags} />;
  },
});

type TodayILearnedPageProps = {
  todayILearneds: TodayILearned[];
  tags: string[];
  selectedTag?: string;
};

export function TodayILearnedPage({ todayILearneds, tags, selectedTag }: TodayILearnedPageProps) {
  return (
    <>
      <Header
        title="Today I Learned"
        subtitle="Language and framework tips and tricks"
        tags={[
          <TagDropdown
            key="tag-dropdown"
            tags={tags}
            selectedTag={selectedTag}
            basePath="/today-i-learned"
          />,
        ]}
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
