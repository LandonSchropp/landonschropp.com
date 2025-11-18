"use client";

import { NoteSummary } from "./note-summary";
import { Header } from "@/components/content/header";
import type { Note } from "@/types";

type NoteSummariesProps = {
  notes: Note[];
};

export function NoteSummaries({ notes }: NoteSummariesProps) {
  const noteSummaries = notes.map((noteSummary) => (
    <NoteSummary key={noteSummary.slug} note={noteSummary} />
  ));

  return (
    <>
      <Header
        title="Notes"
        subText="My personal notes on books, articles, talks, podcasts and more."
      />
      <section className="my-8">{noteSummaries}</section>
    </>
  );
}
