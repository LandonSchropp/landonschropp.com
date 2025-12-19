import { Note } from "../../types";
import { extractYouTubePlaylistId } from "../../utilities/youtube-urls";

type NoteYouTubePlaylistProps = {
  note: Note;
};

export function NoteYouTubePlaylist({ note }: NoteYouTubePlaylistProps) {
  const playlistId = extractYouTubePlaylistId(note.url);

  if (!playlistId) {
    return null;
  }

  return (
    <iframe
      className="my-8 aspect-video w-full shadow-lg"
      src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
    />
  );
}
