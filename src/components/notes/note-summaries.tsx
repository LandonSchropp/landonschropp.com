"use client";

import type { Note } from "../../types";
import { Header } from "../content/header";
import { NoteSummary } from "./note-summary";

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
        subtitle="My personal notes on books, articles, talks, podcasts and more."
      />
      <section className="my-8">{noteSummaries}</section>
    </>
  );
}
