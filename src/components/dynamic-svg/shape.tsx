import { DynamicSVGShape } from "../../types";

/**
 * A row contained in the SVG.
 */
export function Shape(_: DynamicSVGShape) {
  // NOTE: This component isn't actually used to render anything. Rather, it's used when
  // introspecting the content provided to `DynamicSVG` to extract the rows and their metadata.
  return null;
}
