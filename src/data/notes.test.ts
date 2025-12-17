import { fetchNote, fetchNotes, fetchNotesServerFn, fetchNoteServerFn } from "./notes";
import { describe, it, expect, beforeEach } from "vitest";

describe("fetchNotes", () => {
  it("returns notes sorted by date descending", async () => {
    const notes = await fetchNotes();

    // Verify we have notes
    expect(notes.length).toBeGreaterThan(0);

    // Verify all notes are published
    notes.forEach((note) => {
      expect(note.status).toBe("Published");
    });

    // Verify notes are sorted by date in descending order
    for (let i = 0; i < notes.length - 1; i++) {
      const currentDate = notes[i].date;
      const nextDate = notes[i + 1].date;
      expect(currentDate >= nextDate).toBe(true);
    }
  });
});

describe("fetchNotesServerFn", () => {
  it("returns notes", async () => {
    const notes = await fetchNotesServerFn();
    expect(notes.length).toBeGreaterThan(0);
  });
});

describe("fetchNote", () => {
  let slug: string;

  beforeEach(async () => {
    slug = (await fetchNotes())[0].slug;
  });

  describe("when a note with the slug exists", () => {
    it("returns the note with correct slug", async () => {
      const result = await fetchNote(slug);

      expect(result.slug).toBe(slug);
      expect(result.title).not.toEqual("");
      expect(result.status).toBe("Published");
    });
  });

  describe("when a note with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(fetchNote("nonexistent-slug")).rejects.toThrow(
        "Content with slug 'nonexistent-slug' not found.",
      );
    });
  });
});

describe("fetchNoteServerFn", () => {
  it("returns the note corresponding to the slug", async () => {
    const slug = (await fetchNotes())[0].slug;
    const note = await fetchNoteServerFn({ data: { slug } });
    expect(note.slug).toBe(slug);
  });
});
