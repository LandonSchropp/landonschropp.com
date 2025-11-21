import { NoteHeader } from "./note-header";
import {
  BUSINESS_CATEGORY,
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  LIVE_TALK_MEDIA,
  RECORDED_TALK_MEDIA,
  PODCAST_MEDIA,
  VIDEO_MEDIA,
  COURSE_MEDIA,
  APP_MEDIA,
} from "@/constants";
import { Note } from "@/types";
import { render, screen } from "@testing-library/react";

describe("NoteHeader", () => {
  let note: Note;

  beforeEach(() => {
    note = {
      title: "Title",
      authors: ["Author"],
      category: BUSINESS_CATEGORY,
      media: ARTICLE_MEDIA,
      date: "1988-10-05",
      status: "Published",
      slug: "slug",
      source: "Source",
      url: "https://example.com",
      markdown: "",
      filePath: "note.md",
      tags: [],
    };
  });

  it("sets the title", () => {
    render(<NoteHeader note={note} />);
    expect(screen.getByRole("heading")).toHaveTextContent("My personal notes for Title");
  });

  describe("when the note's media is 'Article'", () => {
    beforeEach(() => (note.media = ARTICLE_MEDIA));

    describe("when the note's source and title are the same", () => {
      beforeEach(() => {
        note.source = note.title;
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("An article from Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(() => {
        note.authors = [note.source!];
        render(<NoteHeader note={note} />);
      });

      it("reners the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("An article from Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent(
          "An article by Author from Source",
        );
      });
    });
  });

  describe("when the note's media is 'App'", () => {
    beforeEach(() => (note.media = APP_MEDIA));

    describe("when the note's source and title are the same", () => {
      beforeEach(() => {
        note.source = note.title;
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("From the app Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(() => {
        note.authors = [note.source!];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("From the app Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("By Author from the app Source");
      });
    });
  });

  describe("when the note's media is 'Book'", () => {
    beforeEach(() => (note.media = BOOK_MEDIA));

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note has authors", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A book by Author");
      });
    });
  });

  describe("when the note's media is 'Course'", () => {
    beforeEach(() => (note.media = COURSE_MEDIA));

    describe("when the note's source and title are the same", () => {
      beforeEach(() => {
        note.source = note.title;
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A course from Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(() => {
        note.authors = [note.source!];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A course from Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A course by Author from Source");
      });
    });
  });

  describe("when the note's media is 'Live Talk'", () => {
    beforeEach(() => {
      note.event = "Event";
      note.media = LIVE_TALK_MEDIA;
    });

    describe("when the note's source and title are the same", () => {
      beforeEach(() => {
        note.source = note.title;
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A talk I attended at Event");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent(
          "A talk by Author I attended at Event",
        );
      });
    });
  });

  describe("when the note's media is 'Podcast'", () => {
    beforeEach(() => (note.media = PODCAST_MEDIA));

    describe("when the note's source and title are the same", () => {
      beforeEach(() => {
        note.source = note.title;
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("From the podcast Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(() => {
        note.authors = [note.source!];
        render(<NoteHeader note={note} />);
      });

      it("reners the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("From the podcast Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent(
          "From Source, a podcast by Author",
        );
      });
    });
  });

  describe("when the note's media is 'Recorded Talk'", () => {
    beforeEach(() => (note.media = RECORDED_TALK_MEDIA));

    describe("when the note's source and title are the same", () => {
      beforeEach(() => {
        note.source = note.title;
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("renders the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A talk from Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(() => {
        note.authors = [note.source!];
        render(<NoteHeader note={note} />);
      });

      it("reners the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A talk from Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A talk by Author from Source");
      });
    });
  });

  describe("when the note's media is 'Video'", () => {
    beforeEach(() => (note.media = VIDEO_MEDIA));

    describe("when the note's source and title are the same", () => {
      beforeEach(() => {
        note.source = note.title;
        render(<NoteHeader note={note} />);
      });

      it("does not render a subheader", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("");
      });
    });

    describe("when the note does not have any authors", () => {
      beforeEach(() => {
        note.authors = [];
        render(<NoteHeader note={note} />);
      });

      it("renders the media and source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A video by Source");
      });
    });

    describe("when the note's source and author are the same", () => {
      beforeEach(() => {
        note.authors = [note.source!];
        render(<NoteHeader note={note} />);
      });

      it("renders the media and source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A video by Source");
      });
    });

    describe("when the note's source and authors are different", () => {
      beforeEach(() => render(<NoteHeader note={note} />));

      it("renders the media, authors and the source", () => {
        expect(screen.getByTestId("sub-text")).toHaveTextContent("A video by Author from Source");
      });
    });
  });
});
