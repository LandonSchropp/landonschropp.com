import { Content, Image } from "../types";
import { createHash } from "crypto";
import { openAsBlob } from "fs";
import { readFile } from "fs/promises";
import mime from "mime";
import { join, dirname, extname } from "path";

/**
 * Generates a hash for an image based on its file contents.
 * @param filePath The path to the image file.
 * @returns A hexadecimal hash string.
 */
export async function generateImageHash(filePath: string): Promise<string> {
  const contents = await readFile(filePath);
  return createHash("md5").update(contents).digest("hex");
}

/**
 * Gets the URL path for an image.
 * @param image The image object.
 * @returns The URL path for the image (e.g., "/images/abc123.jpg").
 */
export function getImageHref(image: Image): string {
  return `/images/${image.hash}${extname(image.filePath)}`;
}

/**
 * Downloads the image relative to the provided content.
 * @param content The content to which the image belongs.
 * @param image The image to download.
 * @returns A Response that contains the image.
 */
export async function downloadImage(content: Content, image: string): Promise<Response> {
  const path = join(dirname(content.filePath), image);
  const contentType = mime.getType(extname(image));

  if (!contentType) {
    throw new Error(`Could not determine content type for image '${image}' at '${path}'.`);
  }

  // Open the file as a Blob and get its stream
  const blob = await openAsBlob(path);

  // Create the response and set the appropriate headers for the image
  return new Response(blob.stream(), {
    status: 200,
    headers: {
      "Content-Type": contentType,
    },
  });
}
