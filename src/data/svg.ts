import ampersandRaw from "../images/data/ampersand.svg?raw";
import chessComRaw from "../images/data/chess-com.svg?raw";
import dashRaw from "../images/data/dash.svg?raw";
import designerRaw from "../images/data/designer.svg?raw";
import developerRaw from "../images/data/developer.svg?raw";
import emailRaw from "../images/data/email.svg?raw";
import entrepreneurCommaRaw from "../images/data/entrepreneur-comma.svg?raw";
import entrepreneurRaw from "../images/data/entrepreneur.svg?raw";
import githubRaw from "../images/data/github.svg?raw";
import landonRaw from "../images/data/landon.svg?raw";
import linkedInRaw from "../images/data/linkedin.svg?raw";
import notFoundRaw from "../images/data/not-found.svg?raw";
import notesRaw from "../images/data/notes.svg?raw";
import schroppRaw from "../images/data/schropp.svg?raw";
import tilRaw from "../images/data/til.svg?raw";
import writingRaw from "../images/data/writing.svg?raw";
import { DynamicSVGShape } from "../types";

const SVG_TAG_REGEX = /<svg([^>]*)>\s*([\s\S]*)\s*<\/svg>/i;
const WIDTH_REGEX = /width="(\d+)"/i;
const HEIGHT_REGEX = /height="(\d+)"/i;

function extractSVGData(svg: string): Omit<DynamicSVGShape, "key"> {
  const match = SVG_TAG_REGEX.exec(svg);

  if (match === null) {
    throw new Error(`Invalid SVG data: ${svg}`);
  }

  const widthMatch = WIDTH_REGEX.exec(match[1])?.[1];
  const heightMatch = HEIGHT_REGEX.exec(match[1])?.[1];

  if (widthMatch === undefined || heightMatch === undefined) {
    throw new Error(`Invalid SVG dimensions: ${match[1]}`);
  }

  const originalWidth = Number(widthMatch);
  const originalHeight = Number(heightMatch);

  // SVG masks are black by default and use white to show what parts of the mask are visible, so we
  // need to invert the colors of the content.
  const content = match[2].replaceAll("black", "white");

  return { originalWidth, originalHeight, content };
}

export const ampersand = extractSVGData(ampersandRaw);
export const chessCom = extractSVGData(chessComRaw);
export const dash = extractSVGData(dashRaw);
export const designer = extractSVGData(designerRaw);
export const developer = extractSVGData(developerRaw);
export const email = extractSVGData(emailRaw);
export const entrepreneurComma = extractSVGData(entrepreneurCommaRaw);
export const entrepreneur = extractSVGData(entrepreneurRaw);
export const github = extractSVGData(githubRaw);
export const landon = extractSVGData(landonRaw);
export const linkedIn = extractSVGData(linkedInRaw);
export const notFound = extractSVGData(notFoundRaw);
export const notes = extractSVGData(notesRaw);
export const schropp = extractSVGData(schroppRaw);
export const til = extractSVGData(tilRaw);
export const writing = extractSVGData(writingRaw);
