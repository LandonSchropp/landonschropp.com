import { BoundedDynamicSVGAspect, BoundedDynamicSVGRow } from "../../types";
import { recursivelyReplaceType } from "../../utilities/introspection";
import { Aspect } from "./aspect";
import { BoundedRow } from "./bounded-row";
import { Row } from "./row";
import { keyBy } from "es-toolkit";
import { ReactNode } from "react";

function replaceRowsWithBoundedRows(
  node: ReactNode,
  boundedRows: BoundedDynamicSVGRow[],
): ReactNode {
  const indexedBoundedRows = keyBy(boundedRows, ({ key }) => key);

  return recursivelyReplaceType(node, Row, ({ key, props }) => {
    if (!key) {
      throw new Error("A key is required for each row.");
    }

    return (
      <BoundedRow key={key} boundedRow={indexedBoundedRows[key]}>
        {props.children}
      </BoundedRow>
    );
  });
}

function replaceAspectWithBoundedAspect(
  node: ReactNode,
  boundedAspect: BoundedDynamicSVGAspect,
): ReactNode {
  return recursivelyReplaceType(node, Aspect, ({ key, props }) => {
    // If the aspect is not the selected aspect, remove it.
    if (boundedAspect.key !== key) {
      return null;
    }

    return replaceRowsWithBoundedRows(props.children, boundedAspect.boundedRows);
  });
}

type BoundedAspectProps = {
  /** The children to render. */
  children: ReactNode;

  /** The bounded aspect to display. */
  boundedAspect: BoundedDynamicSVGAspect;
};

export function BoundedAspect({ children, boundedAspect }: BoundedAspectProps) {
  return replaceAspectWithBoundedAspect(children, boundedAspect);
}
