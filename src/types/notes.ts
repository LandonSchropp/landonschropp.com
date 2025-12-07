import {
  ARTICLE_MEDIA,
  APP_MEDIA,
  BOOK_MEDIA,
  COURSE_MEDIA,
  LIVE_TALK_MEDIA,
  PODCAST_MEDIA,
  RECORDED_TALK_MEDIA,
  VIDEO_MEDIA,
  VIDEO_PLAYLIST_MEDIA,
} from "../constants";
import { MediaSchema, NoteSchema } from "../schema";
import z from "zod";

/** A type of media. */
export type Media = z.infer<typeof MediaSchema>;

/** An object containing the metadata and markdown of a note. */
export type Note = z.infer<typeof NoteSchema>;

/** A note about an article. */
export type ArticleNote = Extract<Note, { media: typeof ARTICLE_MEDIA }>;

/** A note about an app. */
export type AppNote = Extract<Note, { media: typeof APP_MEDIA }>;

/** A note about a book. */
export type BookNote = Extract<Note, { media: typeof BOOK_MEDIA }>;

/** A note about a course. */
export type CourseNote = Extract<Note, { media: typeof COURSE_MEDIA }>;

/** A note about a live talk. */
export type LiveTalkNote = Extract<Note, { media: typeof LIVE_TALK_MEDIA }>;

/** A note about a podcast. */
export type PodcastNote = Extract<Note, { media: typeof PODCAST_MEDIA }>;

/** A note about a recorded talk. */
export type RecordedTalkNote = Extract<Note, { media: typeof RECORDED_TALK_MEDIA }>;

/** A note about a video. */
export type VideoNote = Extract<Note, { media: typeof VIDEO_MEDIA }>;

/** A note about a video playlist. */
export type VideoPlaylistNote = Extract<Note, { media: typeof VIDEO_PLAYLIST_MEDIA }>;
