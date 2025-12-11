import type { TodayILearned } from "../../types";
import { FormattedDate } from "../base/formatted-date";
import { Summary } from "../content/summary";

type TodayILearnedSummaryProps = {
  todayILearned: TodayILearned;
};

export function TodayILearnedSummary({ todayILearned }: TodayILearnedSummaryProps) {
  return (
    <Summary
      url={`/today-i-learned/${todayILearned.slug}`}
      title={todayILearned.title}
      description={<FormattedDate date={todayILearned.date} />}
    />
  );
}
