import { Header } from "../../components/content/header";
import { TodayILearnedSummary } from "../../components/today-i-learned/today-i-learned-summary";
import { fetchContents } from "../../data/content";
import { fetchEnvironmentVariable } from "../../env";
import { parseTodayILearned } from "../../schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/today-i-learned/")({
  loader: async () =>
    await fetchContents(fetchEnvironmentVariable("TODAY_I_LEARNED_PATH"), parseTodayILearned),
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

  return (
    <>
      <Header
        title="Today I Learned"
        subText="Language and framework tips and tricks I've learned while coding"
      />
      <section className="my-8">
        {todayILearneds.map((todayILearned) => (
          <TodayILearnedSummary key={todayILearned.slug} todayILearned={todayILearned} />
        ))}
      </section>
    </>
  );
}
