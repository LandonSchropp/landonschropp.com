/**
 * Strips HTML tags from a string, leaving only plain text.
 * @param html The HTML string to process.
 * @returns The plain text with HTML tags removed, or undefined if input is undefined.
 */
export function stripHtmlTags(html: string | undefined): string | undefined {
  return html?.replace(/<[^>]*>/g, "");
}
