"use client";

import { TodayILearnedSummary } from "./today-i-learned-summary";
import { Header } from "@/components/content/header";
import type { TodayILearned } from "@/types";

type TodayILearnedSummariesProps = {
  todayILearneds: TodayILearned[];
};

export function TodayILearnedSummaries({ todayILearneds }: TodayILearnedSummariesProps) {
  return (
    <>
      <Header
        title="Today I Learned"
        subText="Langague and framework tips and tricks I've learned while coding"
      />
      <section className="my-8">
        {todayILearneds.map((todayILearned) => (
          <TodayILearnedSummary key={todayILearned.slug} todayILearned={todayILearned} />
        ))}
      </section>
    </>
  );
}
