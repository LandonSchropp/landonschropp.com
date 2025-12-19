import { Note } from "../../types";

// A relatively simple regex to match YouTube URLs. Taken from here:
// https://gist.github.com/brunodles/927fd8feaaccdbb9d02b
const YOUTUBE_URL_REGEX =
  /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)&?/;

type NoteYouTubeEmbedProps = {
  note: Note;
};

export function NoteYouTubeEmbed({ note }: NoteYouTubeEmbedProps) {
  const match = note.url.match(YOUTUBE_URL_REGEX);

  if (!match) {
    return null;
  }

  return (
    <iframe
      className="aspect-video w-full shadow-lg"
      src={`https://www.youtube.com/embed/${match[1]}?enablejsapi=1`}
    />
  );
}
