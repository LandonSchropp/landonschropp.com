import { NAME } from "../../constants";
import { TodayILearned } from "../../types";
import { FormattedDate } from "../base/formatted-date";
import { Header } from "../content/header";

type TodayILearnedHeaderProps = {
  todayILearned: TodayILearned;
};

export function TodayILearnedHeader({ todayILearned }: TodayILearnedHeaderProps) {
  return (
    <Header
      superText="Today I Learned"
      title={todayILearned.title}
      href={`/today-i-learned/${todayILearned.slug}`}
      subText={
        <>
          <span rel="author">{NAME}</span> • <FormattedDate date={todayILearned.date} />
        </>
      }
    />
  );
}
