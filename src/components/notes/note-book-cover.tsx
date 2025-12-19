import { BOOK_MEDIA } from "../../constants";
import type { Note } from "../../types";

type NoteBookCoverProps = {
  note: Note;
};

export function NoteBookCover({ note }: NoteBookCoverProps) {
  if (note.media !== BOOK_MEDIA || !note.hasBookCoverImage) {
    return null;
  }

  return (
    <figure className="mx-auto my-6 max-w-[25ch]">
      <img
        className="shadow-lg"
        src={`/images/isbn/${note.isbn}.jpg`}
        alt={`${note.title} book cover`}
      />
      <figcaption className="text-theme-extraLightText mt-1 text-center text-xs italic">
        Cover image courtesy of{" "}
        <a className="text-theme-extraLightText underline" href="https://openlibrary.org/">
          Open Library
        </a>
      </figcaption>
    </figure>
  );
}
