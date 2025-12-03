import { NOTES_PATH } from "../env";
import { parseNote } from "../schema";
import { fetchContents, fetchContent } from "./content";
import { describe, it, expect } from "vitest";

describe("fetchNotes", () => {
  it("returns notes sorted by date descending", async () => {
    const notes = await fetchContents(NOTES_PATH, parseNote);

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

describe("fetchNote", () => {
  let slug: string;

  beforeEach(async () => {
    slug = (await fetchContents(NOTES_PATH, parseNote))[0].slug;
  });

  describe("when a note with the slug exists", () => {
    it("returns the note with correct slug", async () => {
      const result = await fetchContent(NOTES_PATH, slug, parseNote);

      expect(result.slug).toBe(slug);
      expect(result.title).not.toEqual("");
      expect(result.status).toBe("Published");
    });
  });

  describe("when a note with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(
        fetchContent(NOTES_PATH, "nonexistent-note-slug-xyz", parseNote),
      ).rejects.toThrow("Content with slug 'nonexistent-note-slug-xyz' not found");
    });
  });
});
