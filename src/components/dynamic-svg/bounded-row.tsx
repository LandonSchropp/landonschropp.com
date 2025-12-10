import { BoundedDynamicSVGRow } from "../../types";
import { recursivelyReplaceType } from "../../utilities/introspection";
import { BoundedShape } from "./bounded-shape";
import { Shape } from "./shape";
import { keyBy } from "es-toolkit";
import { ReactNode } from "react";

type BoundedRowProps = {
  /** The children to render. */
  children: ReactNode;

  /** The bounded row to display. */
  boundedRow: BoundedDynamicSVGRow;
};

/**
 * This component includes the row that's actually rendered to the dynamic SVG. It is not meant to
 * be used directly—instead, use `DynamicSVG.Row` and `DynamicSVG.Shape`.
 */
export function BoundedRow({ children, boundedRow: { boundedShapes } }: BoundedRowProps) {
  const indexedBoundedShapes = keyBy(boundedShapes, ({ key }) => key);

  return recursivelyReplaceType(children, Shape, ({ key }) => {
    if (!key) {
      throw new Error("A key is required for each shape.");
    }

    return <BoundedShape key={key} boundedShape={indexedBoundedShapes[key]} />;
  });
}
