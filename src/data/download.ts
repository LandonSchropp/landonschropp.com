import { last } from "es-toolkit";
import { fileTypeFromBuffer } from "file-type";
import { createWriteStream } from "fs";
import { mkdirp } from "fs-extra";
import { join } from "path";
import { finished } from "stream/promises";
import { v4 as uuidV4 } from "uuid";

// HACK: It's difficult to determine the project root directory in Next.js because the project is
// run out of a build directory. Using `process.cwd()` assumes that the project is run from the
// root. However, that's probably fine for the scope of this project.
const PUBLIC_DIRECTORY = join(process.cwd(), "public");
const DOWNLOADS_DIRECTORY = join(PUBLIC_DIRECTORY, "downloads");

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;

/**
 * Generates a file name for the provided URL. If the URL contains a UUID, that's used for the file
 * name. If not, a random UUID is generated.
 */
function generateFileName(url: string, extension: string): string {
  const { pathname } = new URL(url);
  const uuid = last([...pathname.matchAll(UUID_REGEX)])?.[0] ?? uuidV4();
  return `${uuid}.${extension}`;
}

/**
 * Downloads a file to the public directory. Returns the path inside of the newly downloaded file
 * that can be used to source the file in HTML.
 *
 * HACK: This approach is a big hack. It relies on the idea that the images are downloaded to the
 * public folder, and _then_ Next.js attempts to load them, causing them to be coped into the build.
 * A better way to do this on a production server is to copy the assets to another source on build,
 * such as an S3 bucket, and then serve them from there. However, since this is a static site, this
 * approach works.
 */
export async function downloadFile(url: string) {
  // Create the downloads directory exists.
  await mkdirp(DOWNLOADS_DIRECTORY);

  // Start downloading the file and create a buffer for its contents.
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Check the file type of the image and throw an error if it's no good.
  const fileType = await fileTypeFromBuffer(buffer);

  if (!fileType) {
    throw new Error(
      "The file type could not be reliably determined! The binary data may be malformed!",
    );
  }

  // Determine the paths for the image.
  const fileName = generateFileName(url, fileType.ext);
  const fileUrl = join("/downloads", fileName);
  const filePath = join(DOWNLOADS_DIRECTORY, fileName);

  // Write the file
  const writeStream = createWriteStream(filePath);
  writeStream.write(buffer);
  writeStream.end();
  await finished(writeStream);

  // Return the URL of the file.
  return fileUrl;
}
