import { Note } from "../../types";
import { NoteBookCover } from "./note-book-cover";
import { NoteYouTubeVideo } from "./note-youtube-video";

type NoteEmbedProps = {
  note: Note;
};

export function NoteEmbed({ note }: NoteEmbedProps) {
  return (
    <>
      <NoteBookCover note={note} />
      <NoteYouTubeVideo note={note} />
    </>
  );
}
