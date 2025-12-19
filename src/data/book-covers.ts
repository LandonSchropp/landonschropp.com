/**
 * Generates the URL for the book cover image based on the given ISBN.
 *
 * @param isbn The ISBN of the book.
 * @returns The URL for the book cover image.
 */
export function getBookCoverHref(isbn: number): string {
  return `/images/isbn/${isbn}.jpg`;
}
