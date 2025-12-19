import { Note } from "../../types";
import { extractYouTubeVideoId } from "../../utilities/youtube-urls";

type NoteYouTubeVideoProps = {
  note: Note;
};

export function NoteYouTubeVideo({ note }: NoteYouTubeVideoProps) {
  const videoId = extractYouTubeVideoId(note.url);

  if (!videoId) {
    return null;
  }

  return (
    <iframe
      className="my-8 aspect-video w-full shadow-lg"
      src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
    />
  );
}
