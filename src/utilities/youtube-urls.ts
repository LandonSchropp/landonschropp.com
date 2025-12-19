import {
  BASIC_YOUTUBE_URL_REGEX,
  YOUTUBE_VIDEO_URL_REGEX,
  SHORT_YOUTUBE_VIDEO_URL_REGEX,
  YOUTUBE_PLAYLIST_URL_REGEX,
} from "../constants";

/**
 * Checks if the provided URL is a YouTube URL.
 * @param url The URL to check.
 * @returns True if the URL is a YouTube URL, false otherwise.
 */
export function isYouTubeUrl(url: string): boolean {
  return BASIC_YOUTUBE_URL_REGEX.test(url);
}

/**
 * Checks if the provided URL is a YouTube video URL.
 * @param url The URL to check.
 * @returns True if the URL is a YouTube video URL, false otherwise.
 */
export function isYouTubeVideoUrl(url: string): boolean {
  return YOUTUBE_VIDEO_URL_REGEX.test(url) || SHORT_YOUTUBE_VIDEO_URL_REGEX.test(url);
}

/**
 * Checks if the provided URL is a YouTube playlist URL.
 * @param url The URL to check.
 * @returns True if the URL is a YouTube playlist URL, false otherwise.
 */
export function isYouTubePlaylistUrl(url: string): boolean {
  return YOUTUBE_PLAYLIST_URL_REGEX.test(url);
}

/**
 * Checks if the provided URL is a valid YouTube video or playlist URL.
 * @param url The URL to check.
 * @returns True if the URL is a valid YouTube video or playlist URL, false otherwise.
 */
export function isValidYouTubeUrl(url: string): boolean {
  return isYouTubeVideoUrl(url) || isYouTubePlaylistUrl(url);
}
