import { Header } from "../../components/content/header";
import { Tag } from "../../components/content/tag";
import { TodayILearnedSummary } from "../../components/today-i-learned/today-i-learned-summary";
import { fetchTodayILearneds } from "../../data/today-i-learned";
import { TagSearchSchema } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/")({
  validateSearch: TagSearchSchema,
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: async ({ deps: { tag } }) => {
    const todayILearneds = await fetchTodayILearneds();
    return tag ? todayILearneds.filter(({ tags }) => tags.includes(tag)) : todayILearneds;
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
  const todayILearneds = Route.useLoaderData();
  const { tag } = Route.useSearch();

  return (
    <>
      <Header
        title="Today I Learned"
        subtitle="Language and framework tips and tricks I've learned while coding"
        tags={tag ? [<Tag key={tag} name={tag} href="/today-i-learned" />] : undefined}
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
