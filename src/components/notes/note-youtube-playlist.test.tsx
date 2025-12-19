import { noteFactory } from "../../../test/factories";
import { NoteYouTubePlaylist } from "./note-youtube-playlist";
import { render } from "@testing-library/react";

describe("NoteYouTubePlaylist", () => {
  describe("when the URL is a YouTube playlist URL", () => {
    it("renders an iframe with the YouTube playlist embed URL", () => {
      const note = noteFactory
        .videoPlaylist()
        .build({ url: "https://www.youtube.com/playlist?list=PLabc123" });

      const { container } = render(<NoteYouTubePlaylist note={note} />);

      expect(container.querySelector("iframe")).toBeInTheDocument();
      expect(container.querySelector("iframe")).toHaveAttribute(
        "src",
        "https://www.youtube.com/embed/videoseries?list=PLabc123",
      );
    });
  });

  describe("when the URL is not a YouTube playlist URL", () => {
    it("does not render an iframe", () => {
      const note = noteFactory.videoPlaylist().build({ url: "https://example.com/playlist" });

      const { container } = render(<NoteYouTubePlaylist note={note} />);

      expect(container.querySelector("iframe")).not.toBeInTheDocument();
    });
  });
});
