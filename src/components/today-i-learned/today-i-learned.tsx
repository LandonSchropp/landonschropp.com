"use client";

import type { TodayILearned as TodayILearnedType } from "../../types";
import { Markdown } from "../content/markdown";
import { TodayILearnedHeader } from "./today-i-learned-header";

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
