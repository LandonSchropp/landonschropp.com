import { Header } from "../../components/content/header";
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

  const headerTagProps = tag
    ? {
        tags: [tag],
        tagsIndexHref: "/today-i-learned",
      }
    : {};

  return (
    <>
      <Header
        title="Today I Learned"
        subtitle="Language and framework tips and tricks I've learned while coding"
        {...headerTagProps}
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
