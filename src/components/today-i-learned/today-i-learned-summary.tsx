import type { TodayILearned } from "../../types";
import { FormattedDate } from "../base/formatted-date";
import { Summary } from "../content/summary";

type TodayILearnedSummaryProps = {
  todayILearned: TodayILearned;
  index: number;
  count: number;
};

export function TodayILearnedSummary({ todayILearned, index, count }: TodayILearnedSummaryProps) {
  return (
    <Summary
      url={`/today-i-learned/${todayILearned.slug}`}
      title={todayILearned.title}
      description={<FormattedDate date={todayILearned.date} />}
      tags={todayILearned.tags}
      tagsIndexHref="/today-i-learned"
      index={index}
      count={count}
    />
  );
}
