import {
  APP_MEDIA,
  ARTICLE_MEDIA,
  BOOK_MEDIA,
  COURSE_MEDIA,
  LIVE_TALK_MEDIA,
  PODCAST_MEDIA,
  RECORDED_TALK_MEDIA,
  VIDEO_MEDIA,
  VIDEO_PLAYLIST_MEDIA,
} from "../../src/constants";
import type { Note } from "../../src/types";
import { ContentFactory, contentFactory } from "./content.factory";
import { DeepPartial } from "fishery";

export class NoteFactory extends ContentFactory<Note> {
  article() {
    return this.params({
      media: ARTICLE_MEDIA,
      source: "Example Source",
    } as DeepPartial<Note>);
  }

  app() {
    return this.params({
      media: APP_MEDIA,
      source: "Example App",
    } as DeepPartial<Note>);
  }

  book() {
    return this.params({
      media: BOOK_MEDIA,
      isbn: 9780123456789,
    } as DeepPartial<Note>);
  }

  course() {
    return this.params({
      media: COURSE_MEDIA,
      source: "Example Course Platform",
    } as DeepPartial<Note>);
  }

  liveTalk() {
    return this.params({
      media: LIVE_TALK_MEDIA,
      event: "Example Conference 2024",
    } as DeepPartial<Note>);
  }

  podcast() {
    return this.params({
      media: PODCAST_MEDIA,
      source: "Example Podcast",
    } as DeepPartial<Note>);
  }

  recordedTalk() {
    return this.params({
      media: RECORDED_TALK_MEDIA,
      source: "Example Conference",
    } as DeepPartial<Note>);
  }

  video() {
    return this.params({
      media: VIDEO_MEDIA,
      source: "Example Video Platform",
    } as DeepPartial<Note>);
  }

  videoPlaylist() {
    return this.params({
      media: VIDEO_PLAYLIST_MEDIA,
      source: "Example Playlist",
    } as DeepPartial<Note>);
  }
}

// Default to most common variant
export const noteFactory = NoteFactory.define<Note, any, Note, Partial<Note>, NoteFactory>(
  ({ sequence }) => {
    const content = contentFactory.build();

    return {
      ...content,
      authors: ["Author"],
      url: `https://example.com/content-${sequence}`,
      media: ARTICLE_MEDIA,
      source: "Example Source",
    };
  },
);
