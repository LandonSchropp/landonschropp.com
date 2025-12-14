import { Content } from "../types";
import { openAsBlob } from "fs";
import mime from "mime";
import { join, dirname, extname } from "path";

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
