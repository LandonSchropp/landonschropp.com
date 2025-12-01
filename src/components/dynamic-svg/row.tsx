import { DynamicSVGRow } from "../../types";

type DynamicSVGRowProps = Omit<DynamicSVGRow, "shapes"> & {
  /** The shapes contained in the row, as well as their surrounding markup. */
  children: React.ReactNode;
};

/** A row contained in the SVG. */
export function Row(_: DynamicSVGRowProps) {
  // NOTE: This component isn't actually used to render anything. Rather, it's used when
  // introspecting the content provided to `DynamicSVG` to extract the rows and their metadata.
  return null;
}
