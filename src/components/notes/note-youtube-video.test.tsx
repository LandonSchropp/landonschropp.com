import { noteFactory } from "../../../test/factories";
import { NoteYouTubeVideo } from "./note-youtube-video";
import { render } from "@testing-library/react";

describe("NoteYouTubeVideo", () => {
  describe("when the URL is a YouTube video URL", () => {
    it("renders an iframe with the YouTube video embed URL", () => {
      const note = noteFactory.video().build({ url: "https://www.youtube.com/watch?v=abc123" });

      const { container } = render(<NoteYouTubeVideo note={note} />);

      expect(container.querySelector("iframe")).toBeInTheDocument();
      expect(container.querySelector("iframe")).toHaveAttribute(
        "src",
        "https://www.youtube.com/embed/abc123?enablejsapi=1",
      );
    });
  });

  describe("when the URL is not a YouTube video URL", () => {
    it("does not render an iframe", () => {
      const note = noteFactory.video().build({ url: "https://example.com/video" });

      const { container } = render(<NoteYouTubeVideo note={note} />);

      expect(container.querySelector("iframe")).not.toBeInTheDocument();
    });
  });
});
