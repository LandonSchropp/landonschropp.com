import {
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
  SVG_DATA_KEYS,
  TIL_SVG_DATA_KEY,
  WRITING_SVG_DATA_KEY,
} from "../constants";
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
import { DynamicSVGShape, SvgDataKey } from "../types";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import z from "zod";

const SVG_TAG_REGEX = /<svg([^>]*)>\s*([\s\S]*)\s*<\/svg>/i;
const WIDTH_REGEX = /width="(\d+)"/i;
const HEIGHT_REGEX = /height="(\d+)"/i;

const RAW_DATA = {
  [AMPERSAND_SVG_DATA_KEY]: ampersandRaw,
  [CHESS_COM_SVG_DATA_KEY]: chessComRaw,
  [DASH_SVG_DATA_KEY]: dashRaw,
  [DESIGNER_SVG_DATA_KEY]: designerRaw,
  [DEVELOPER_SVG_DATA_KEY]: developerRaw,
  [EMAIL_SVG_DATA_KEY]: emailRaw,
  [ENTREPRENEUR_COMMA_SVG_DATA_KEY]: entrepreneurCommaRaw,
  [ENTREPRENEUR_SVG_DATA_KEY]: entrepreneurRaw,
  [GITHUB_SVG_DATA_KEY]: githubRaw,
  [LANDON_SVG_DATA_KEY]: landonRaw,
  [LINKED_IN_SVG_DATA_KEY]: linkedInRaw,
  [NOT_FOUND_SVG_DATA_KEY]: notFoundRaw,
  [NOTES_SVG_DATA_KEY]: notesRaw,
  [SCHROPP_SVG_DATA_KEY]: schroppRaw,
  [TIL_SVG_DATA_KEY]: tilRaw,
  [WRITING_SVG_DATA_KEY]: writingRaw,
} as const;

export function extractSVGData(key: SvgDataKey): Omit<DynamicSVGShape, "key"> {
  const svg = RAW_DATA[key];
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

export const fetchSvgData = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .inputValidator(z.object({ key: z.enum(SVG_DATA_KEYS) }))
  .handler(({ data: { key } }) => extractSVGData(key));
