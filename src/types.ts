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
} from "./constants";
import {
  ArticleSchema,
  CategorySchema,
  ContentSchema,
  MediaSchema,
  NoteSchema,
  TechnologySchema,
  TodayILearnedSchema,
} from "./schema";
import { UnknownContentSchema } from "./schema/unknown-content";
import { PassthroughType, z } from "zod";

/** A topical category of content. */
export type Category = z.infer<typeof CategorySchema>;

/** A type of media. */
export type Media = z.infer<typeof MediaSchema>;

/** A category of technology, such as a programming language or framework. */
export type Technology = z.infer<typeof TechnologySchema>;

/** An object containing the metadata and markdown of some form of content. */
export type Content = z.infer<typeof ContentSchema>;

/** A version of Content that allows unknown properties to be passed through. */
export type UnknownContent = z.infer<typeof UnknownContentSchema> & PassthroughType<"passthrough">;

/** An object containing the metadata and markdown of a note. */
export type Note = z.infer<typeof NoteSchema>;

/** An object containing the metadata and markdown of an article. */
export type Article = z.infer<typeof ArticleSchema>;

/** An object containing the metadata and markdown of a today I Learned (TIL). */
export type TodayILearned = z.infer<typeof TodayILearnedSchema>;

/** An article that was written and has markdown content. */
export type WrittenArticle = Extract<Article, { publisher: undefined }>;

/** An article that references external content. */
export type ExternalArticle = Extract<Article, { publisher: string }>;

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

/** The coordinates of an object. */
export type Coordinates = {
  /** The x-coordinate of the object. */
  x: number;

  /** The y-coordinate of the object. */
  y: number;
};

/** Represents the size of a rectangle. */
export type Size = {
  /** The width of the rectangle. */
  width: number;

  /** The height of the rectangle. */
  height: number;
};

/** The bounds of an object. */
export type Bounds = Coordinates & Size;

/** Represents a raw SVG shape's data. */
export type DynamicSVGShape = {
  /** The unique identifier of the shape. */
  key: string;

  /** The untransformed width of the shape. */
  originalWidth: number;

  /** The untransformed height of the shape. */
  originalHeight: number;

  /** The inner HTML of the shape to render. */
  content: string;
};

/** Represents a row of shapes in an aspect. */
export type DynamicSVGRow = {
  /** The unique identifier of the row. */
  key: string;

  /** The space between each shape in the row, represented as a percentage of the row. */
  spacing: number;

  /** The way that shapes are aligned within the row. */
  align: "top" | "middle";

  /** The shapes contained in the row. */
  shapes: DynamicSVGShape[];
};

/** One possible layout of shapes in the SVG. */
export type DynamicSVGAspect = {
  /** The unique identifier of the aspect. */
  key: string;

  /** The shapes contained in the aspect. */
  rows: DynamicSVGRow[];

  /**
   * The minimum spacing between the shapes, expressed as a percentage of the width of the aspect.
   */
  minSpacing: number;

  /**
   * The maximum spacing between the shapes, expressed as a percentage of the width of the aspect.
   */
  maxSpacing: number;
};

/** An object that has bounds. */
export type BoundedObject = {
  /** The bounds of the object. */
  bounds: Bounds;
};

/** A shape that has been transformed by scaling and translating it. */
export type BoundedDynamicSVGShape = DynamicSVGShape & BoundedObject;

/** A row that contains transformed shapes and bounds. */
export type BoundedDynamicSVGRow = BoundedObject & {
  /** The unique identifier of the row. */
  key: string;

  /** The bounded shapes contained in the row. */
  boundedShapes: BoundedDynamicSVGShape[];
};

/** An aspect that contains transformed rows and bounds. */
export type BoundedDynamicSVGAspect = BoundedObject & {
  /** The unique identifier of the aspect. */
  key: string;

  /** The bounded rows contained in the aspect. */
  boundedRows: BoundedDynamicSVGRow[];
};
