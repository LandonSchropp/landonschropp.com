import { Listify } from "@/components/base/listify";
import { Summary } from "@/components/content/summary";
import type { Note } from "@/types";

type NoteBylineProps = {
  note: Note;
};

function shouldIncludeAuthors(note: Note) {
  return note.authors.length !== 0;
}

function shouldIncludeSource(note: Note) {
  return "source" in note && !(note.authors.length === 1 && note.authors[0] === note.source);
}

function NoteBylineAuthors({ note }: NoteBylineProps) {
  return (
    <span key="authors" className="max-md:block">
      <Listify items={note.authors} />
    </span>
  );
}

function NoteBylineSource({ note }: NoteBylineProps) {
  return (
    <span key="source" className="max-md:italic">
      {"source" in note && note.source}
    </span>
  );
}

function NoteByline({ note }: NoteBylineProps) {
  const authors = <NoteBylineAuthors note={note} />;
  const source = <NoteBylineSource note={note} />;

  if (!shouldIncludeSource(note)) {
    return authors;
  }

  if (!shouldIncludeAuthors(note)) {
    return source;
  }

  return (
    <>
      {authors} <span className="max-md:hidden">∙</span> {source}
    </>
  );
}

type NoteSummaryProps = {
  note: Note;
};

export function NoteSummary({ note }: NoteSummaryProps) {
  return (
    <Summary url={`/notes/${note.slug}`} title={note.title}>
      <NoteByline note={note} />
    </Summary>
  );
}
