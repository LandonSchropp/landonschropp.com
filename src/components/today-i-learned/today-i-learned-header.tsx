import { NAME } from "../../constants";
import { TodayILearned } from "../../types";
import { FormattedDate } from "../base/formatted-date";
import { Header } from "../content/header";
import { Tag } from "../content/tag";

type TodayILearnedHeaderProps = {
  todayILearned: TodayILearned;
};

export function TodayILearnedHeader({ todayILearned }: TodayILearnedHeaderProps) {
  return (
    <Header
      kicker="Today I Learned"
      title={todayILearned.title}
      subtitle={
        <>
          <span rel="author">{NAME}</span> • <FormattedDate date={todayILearned.date} />
        </>
      }
      tags={todayILearned.tags.map((tag) => (
        <Tag key={tag} name={tag} href={`/today-i-learned?tag=${tag}`} />
      ))}
    />
  );
}
