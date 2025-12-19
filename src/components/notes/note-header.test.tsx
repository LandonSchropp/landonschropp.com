import { noteFactory } from "../../../test/factories";
import { renderWithRouter } from "../../../test/render";
import { Note } from "../../types";
import { NoteHeader } from "./note-header";
import { screen } from "@testing-library/react";

describe("NoteHeader", () => {
  describe("when the note is any type", () => {
    let note: Note;

    beforeEach(async () => {
      note = noteFactory.article().build({ title: "Title" });
      await renderWithRouter(<NoteHeader note={note} />);
    });

    it("sets the title", () => {
      expect(screen.getByRole("heading")).toHaveTextContent("My personal notes for Title");
    });
  });

  describe("when the note's media is 'Article'", () => {
    let note: Note;

    describe("when the note's source and title are the same", () => {
      beforeEach(async () => {
        note = noteFactory.article().build({ title: "Example", source: "Example" });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        note = noteFactory.article().build({ title: "Title", source: "Source", authors: [] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("An article from Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(async () => {
        note = noteFactory
          .article()
          .build({ title: "Title", source: "Source", authors: ["Source"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("An article from Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory
          .article()
          .build({ title: "Title", source: "Source", authors: ["Author"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent(
          "An article by Author from Source",
        );
      });
    });
  });

  describe("when the note's media is 'App'", () => {
    let note: Note;

    describe("when the note's source and title are the same", () => {
      beforeEach(async () => {
        note = noteFactory.app().build({ title: "Example", source: "Example" });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        note = noteFactory.app().build({ title: "Title", source: "Source", authors: [] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("From the app Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(async () => {
        note = noteFactory.app().build({ title: "Title", source: "Source", authors: ["Source"] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("From the app Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory.app().build({ title: "Title", source: "Source", authors: ["Author"] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("By Author from the app Source");
      });
    });
  });

  describe("when the note's media is 'Book'", () => {
    let note: Note;

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        // Override the authors to be empty - this violates the schema but tests the component behavior
        note = { ...noteFactory.book().build({ title: "Title" }), authors: [] };
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note has authors", () => {
      beforeEach(async () => {
        note = noteFactory.book().build({ title: "Title", authors: ["Author"] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A book by Author");
      });
    });
  });

  describe("when the note's media is 'Course'", () => {
    let note: Note;

    describe("when the note's source and title are the same", () => {
      beforeEach(async () => {
        note = noteFactory.course().build({ title: "Example", source: "Example" });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        note = noteFactory.course().build({ title: "Title", source: "Source", authors: [] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A course from Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(async () => {
        note = noteFactory
          .course()
          .build({ title: "Title", source: "Source", authors: ["Source"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A course from Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory
          .course()
          .build({ title: "Title", source: "Source", authors: ["Author"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A course by Author from Source");
      });
    });
  });

  describe("when the note's media is 'Live Talk'", () => {
    let note: Note;

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        // Override authors to be empty - this violates the schema but tests the component behavior
        note = { ...noteFactory.liveTalk().build({ title: "Title", event: "Event" }), authors: [] };
        await renderWithRouter(<NoteHeader note={{ ...note }} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A talk I attended at Event");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory
          .liveTalk()
          .build({ title: "Title", event: "Event", authors: ["Author"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent(
          "A talk by Author I attended at Event",
        );
      });
    });
  });

  describe("when the note's media is 'Podcast'", () => {
    let note: Note;

    describe("when the note's source and title are the same", () => {
      beforeEach(async () => {
        note = noteFactory.podcast().build({ title: "Example", source: "Example" });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        note = noteFactory.podcast().build({ title: "Title", source: "Source", authors: [] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("From the podcast Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(async () => {
        note = noteFactory
          .podcast()
          .build({ title: "Title", source: "Source", authors: ["Source"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("From the podcast Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory
          .podcast()
          .build({ title: "Title", source: "Source", authors: ["Author"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent(
          "From Source, a podcast by Author",
        );
      });
    });
  });

  describe("when the note's media is 'Recorded Talk'", () => {
    let note: Note;

    describe("when the note's source and title are the same", () => {
      beforeEach(async () => {
        note = noteFactory.recordedTalk().build({ title: "Example", source: "Example" });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        note = noteFactory.recordedTalk().build({ title: "Title", source: "Source", authors: [] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A talk from Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(async () => {
        note = noteFactory
          .recordedTalk()
          .build({ title: "Title", source: "Source", authors: ["Source"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A talk from Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory
          .recordedTalk()
          .build({ title: "Title", source: "Source", authors: ["Author"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A talk by Author from Source");
      });
    });
  });

  describe("when the note's media is 'Video'", () => {
    let note: Note;

    describe("when the note's source and title are the same", () => {
      beforeEach(async () => {
        note = noteFactory.video().build({ title: "Example", source: "Example" });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        note = noteFactory.video().build({ title: "Title", source: "Source", authors: [] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media and source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A video by Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(async () => {
        note = noteFactory.video().build({ title: "Title", source: "Source", authors: ["Source"] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media and source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A video by Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory.video().build({ title: "Title", source: "Source", authors: ["Author"] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A video by Author from Source");
      });
    });
  });

  describe("when the note's media is 'Video Playlist'", () => {
    let note: Note;

    describe("when the note's source and title are the same", () => {
      beforeEach(async () => {
        note = noteFactory.videoPlaylist().build({ title: "Example", source: "Example" });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(async () => {
        note = noteFactory.videoPlaylist().build({ title: "Title", source: "Source", authors: [] });
        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media and source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A series of videos from Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(async () => {
        note = noteFactory
          .videoPlaylist()
          .build({ title: "Title", source: "Source", authors: ["Source"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media and source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent("A series of videos from Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(async () => {
        note = noteFactory
          .videoPlaylist()
          .build({ title: "Title", source: "Source", authors: ["Author"] });

        await renderWithRouter(<NoteHeader note={note} />);
      });

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("subtitle")).toHaveTextContent(
          "A series of videos by Author from Source",
        );
      });
    });
  });
});
