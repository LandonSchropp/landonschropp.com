"use client";

import { Markdown } from "../content/markdown";
import { TodayILearnedHeader } from "@/components/today-i-learned/today-i-learned-header";
import type { TodayILearned as TodayILearnedType } from "@/types";

type TodayILearnedProps = {
  todayILearned: TodayILearnedType;
};

export function TodayILearned({ todayILearned }: TodayILearnedProps) {
  return (
    <article className="my-6">
      <TodayILearnedHeader todayILearned={todayILearned} />
      <Markdown markdown={todayILearned.markdown} slug={todayILearned.slug} />
    </article>
  );
}
