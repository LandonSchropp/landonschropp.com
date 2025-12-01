import { Note } from "../../types";
import { NoteBookCover } from "./note-book-cover";
import { NoteYouTubeEmbed } from "./note-youtube-embed";

type NoteEmbedProps = {
  note: Note;
};

export function NoteEmbed({ note }: NoteEmbedProps) {
  return (
    <>
      <NoteBookCover note={note} />
      <NoteYouTubeEmbed note={note} />
    </>
  );
}
