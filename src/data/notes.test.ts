import { createContentDirectory, removeContentDirectory } from "../../test/content";
import { noteFactory } from "../../test/factories";
import { fetchNotes, fetchNote, fetchNotesServerFn, fetchNoteServerFn } from "./notes";
import { join } from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

let directory: string;

beforeEach(async () => {
  directory = await createContentDirectory();
  vi.stubEnv("NOTES_PATH", join(directory, "notes"));
});

afterEach(async () => {
  await removeContentDirectory(directory);
});

describe("fetchNotes", () => {
  describe("when there are published notes", () => {
    beforeEach(async () => {
      await noteFactory.create(
        { title: "Note C", date: "2024-01-15", status: "Published", slug: "note-c" },
        { transient: { directory } },
      );

      await noteFactory.create(
        { title: "Note A", date: "2024-01-10", status: "Published", slug: "note-a" },
        { transient: { directory } },
      );

      await noteFactory.create(
        { title: "Note B", date: "2024-01-20", status: "Published", slug: "note-b" },
        { transient: { directory } },
      );
    });

    it("returns notes sorted by date descending", async () => {
      const notes = await fetchNotes();

      expect(notes).toHaveLength(3);
      expect(notes[0].slug).toBe("note-b");
      expect(notes[1].slug).toBe("note-c");
      expect(notes[2].slug).toBe("note-a");
    });

    it("returns notes with the Published status", async () => {
      const notes = await fetchNotes();
      notes.forEach((note) => {
        expect(note.status).toBe("Published");
      });
    });
  });
});

describe("fetchNotesServerFn", () => {
  beforeEach(async () => {
    await noteFactory.create(
      { title: "Server Fn Note", slug: "server-fn-note" },
      { transient: { directory } },
    );
  });

  it("returns notes", async () => {
    const notes = await fetchNotesServerFn();
    expect(notes).toHaveLength(1);
  });
});

describe("fetchNote", () => {
  beforeEach(async () => {
    await noteFactory.create(
      { title: "Target Note", slug: "target-note" },
      { transient: { directory } },
    );

    await noteFactory.create(
      { title: "Other Note", slug: "other-note" },
      { transient: { directory } },
    );
  });

  describe("when a note with the slug exists", () => {
    it("returns the note with the correct slug", async () => {
      const result = await fetchNote("target-note");
      expect(result.slug).toBe("target-note");
      expect(result.title).toBe("Target Note");
    });
  });

  describe("when a note with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(fetchNote("nonexistent-slug")).rejects.toThrow(
        "Content with slug 'nonexistent-slug' not found",
      );
    });
  });
});

describe("fetchNoteServerFn", () => {
  beforeEach(async () => {
    await noteFactory.create(
      { title: "Server Fn Note", slug: "server-fn-note" },
      { transient: { directory } },
    );
  });

  it("returns the note corresponding to the slug", async () => {
    const note = await fetchNoteServerFn({ data: { slug: "server-fn-note" } });
    expect(note.slug).toBe("server-fn-note");
  });
});
