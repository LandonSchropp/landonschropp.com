import { createContentDirectory, removeContentDirectory } from "../../test/content";
import { todayILearnedFactory } from "../../test/factories";
import {
  fetchTodayILearneds,
  fetchTodayILearned,
  fetchTodayILearnedsServerFn,
  fetchTodayILearnedServerFn,
} from "./today-i-learned";
import { join } from "path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

let directory: string;
const originalTilPath = process.env.TODAY_I_LEARNED_PATH;

beforeEach(async () => {
  directory = await createContentDirectory();
  process.env.TODAY_I_LEARNED_PATH = join(directory, "today-i-learned");
});

afterEach(async () => {
  process.env.TODAY_I_LEARNED_PATH = originalTilPath;
  await removeContentDirectory(directory);
});

describe("fetchTodayILearneds", () => {
  describe("when there are published TILs", () => {
    beforeEach(async () => {
      await todayILearnedFactory.create(
        { title: "TIL C", date: "2024-01-15", status: "Published", slug: "til-c" },
        { transient: { directory } },
      );

      await todayILearnedFactory.create(
        { title: "TIL A", date: "2024-01-10", status: "Published", slug: "til-a" },
        { transient: { directory } },
      );

      await todayILearnedFactory.create(
        { title: "TIL B", date: "2024-01-20", status: "Published", slug: "til-b" },
        { transient: { directory } },
      );
    });

    it("returns TILs sorted by date descending", async () => {
      const tils = await fetchTodayILearneds();

      expect(tils).toHaveLength(3);
      expect(tils[0].slug).toBe("til-b");
      expect(tils[1].slug).toBe("til-c");
      expect(tils[2].slug).toBe("til-a");
    });

    it("returns TILs with the Published status", async () => {
      const tils = await fetchTodayILearneds();
      tils.forEach((til) => {
        expect(til.status).toBe("Published");
      });
    });
  });
});

describe("fetchTodayILearnedsServerFn", () => {
  beforeEach(async () => {
    await todayILearnedFactory.create(
      { title: "Server Fn TIL", slug: "server-fn-til" },
      { transient: { directory } },
    );
  });

  it("returns TILs", async () => {
    const tils = await fetchTodayILearnedsServerFn();
    expect(tils).toHaveLength(1);
  });
});

describe("fetchTodayILearned", () => {
  beforeEach(async () => {
    await todayILearnedFactory.create(
      { title: "Target TIL", slug: "target-til" },
      { transient: { directory } },
    );

    await todayILearnedFactory.create(
      { title: "Other TIL", slug: "other-til" },
      { transient: { directory } },
    );
  });

  describe("when a TIL with the slug exists", () => {
    it("returns the TIL with the correct slug", async () => {
      const result = await fetchTodayILearned("target-til");
      expect(result.slug).toBe("target-til");
      expect(result.title).toBe("Target TIL");
    });
  });

  describe("when a TIL with the slug does not exist", () => {
    it("throws an error", async () => {
      await expect(fetchTodayILearned("nonexistent-til-slug-xyz")).rejects.toThrow(
        "Content with slug 'nonexistent-til-slug-xyz' not found",
      );
    });
  });
});

describe("fetchTodayILearnedServerFn", () => {
  beforeEach(async () => {
    await todayILearnedFactory.create(
      { title: "Server Fn TIL", slug: "server-fn-til" },
      { transient: { directory } },
    );
  });

  it("returns the TIL corresponding to the slug", async () => {
    const til = await fetchTodayILearnedServerFn({ data: { slug: "server-fn-til" } });
    expect(til.slug).toBe("server-fn-til");
  });
});
