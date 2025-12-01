"use client";

import type { Note as NoteType } from "../../types";
import { Markdown } from "../content/markdown";
import { NoteEmbed } from "./note-embed";
import { NoteHeader } from "./note-header";

type NoteProps = {
  note: NoteType;
};

export function Note({ note }: NoteProps) {
  return (
    <article className="my-6">
      <NoteHeader note={note} />
      <NoteEmbed note={note} />
      <Markdown markdown={note.markdown} slug={note.slug} />
    </article>
  );
}
