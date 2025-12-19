export const ARTICLE_MEDIA = "Article";
export const APP_MEDIA = "App";
export const BOOK_MEDIA = "Book";
export const COURSE_MEDIA = "Course";
export const LIVE_TALK_MEDIA = "Live Talk";
export const OTHER_MEDIA = "Other";
export const PODCAST_MEDIA = "Podcast";
export const RECORDED_TALK_MEDIA = "Recorded Talk";
export const VIDEO_MEDIA = "Video";
export const VIDEO_PLAYLIST_MEDIA = "Video Playlist";

export const MEDIAS = [
  ARTICLE_MEDIA,
  APP_MEDIA,
  BOOK_MEDIA,
  COURSE_MEDIA,
  LIVE_TALK_MEDIA,
  OTHER_MEDIA,
  PODCAST_MEDIA,
  RECORDED_TALK_MEDIA,
  VIDEO_MEDIA,
  VIDEO_PLAYLIST_MEDIA,
] as const;

export const IDEA_STATUS = "Idea";
export const DRAFT_STATUS = "Draft";
export const PUBLISHED_STATUS = "Published";
export const WILL_NOT_PUBLISH_STATUS = "Will Not Publish";

export const STATUSES = [
  IDEA_STATUS,
  DRAFT_STATUS,
  PUBLISHED_STATUS,
  WILL_NOT_PUBLISH_STATUS,
] as const;

export const NAME = "Landon Schropp";

export const AMPERSAND_SVG_DATA_KEY = "ampersand";
export const CHESS_COM_SVG_DATA_KEY = "chessCom";
export const DASH_SVG_DATA_KEY = "dash";
export const DESIGNER_SVG_DATA_KEY = "designer";
export const DEVELOPER_SVG_DATA_KEY = "developer";
export const EMAIL_SVG_DATA_KEY = "email";
export const ENTREPRENEUR_COMMA_SVG_DATA_KEY = "entrepreneurComma";
export const ENTREPRENEUR_SVG_DATA_KEY = "entrepreneur";
export const GITHUB_SVG_DATA_KEY = "github";
export const LANDON_SVG_DATA_KEY = "landon";
export const LINKED_IN_SVG_DATA_KEY = "linkedIn";
export const NOT_FOUND_SVG_DATA_KEY = "notFound";
export const NOTES_SVG_DATA_KEY = "notes";
export const SCHROPP_SVG_DATA_KEY = "schropp";
export const TIL_SVG_DATA_KEY = "til";
export const WRITING_SVG_DATA_KEY = "writing";

export const SVG_DATA_KEYS = [
  AMPERSAND_SVG_DATA_KEY,
  CHESS_COM_SVG_DATA_KEY,
  DASH_SVG_DATA_KEY,
  DESIGNER_SVG_DATA_KEY,
  DEVELOPER_SVG_DATA_KEY,
  EMAIL_SVG_DATA_KEY,
  ENTREPRENEUR_COMMA_SVG_DATA_KEY,
  ENTREPRENEUR_SVG_DATA_KEY,
  GITHUB_SVG_DATA_KEY,
  LANDON_SVG_DATA_KEY,
  LINKED_IN_SVG_DATA_KEY,
  NOT_FOUND_SVG_DATA_KEY,
  NOTES_SVG_DATA_KEY,
  SCHROPP_SVG_DATA_KEY,
  TIL_SVG_DATA_KEY,
  WRITING_SVG_DATA_KEY,
  NOT_FOUND_SVG_DATA_KEY,
] as const;

/** Regular expression to match basic YouTube URLs. */
export const BASIC_YOUTUBE_URL_REGEX = /youtu\.?be/;

/** Regular expression to match YouTube video URLs. */
export const YOUTUBE_VIDEO_URL_REGEX =
  /^https:\/\/(?:www\.)?youtube\.com\/watch.*(?:[&?]v=)([\w-]+)/i;

/** Regular expression to match short YouTube video URLs. */
export const SHORT_YOUTUBE_VIDEO_URL_REGEX = /^https:\/\/?youtu\.be\/([\w-]+)/;

/** Regular expression to match YouTube playlist URLs. */
export const YOUTUBE_PLAYLIST_URL_REGEX =
  /^https:\/\/(?:www\.)?youtube\.com\/playlist?.*list=([\w-]+)/;
