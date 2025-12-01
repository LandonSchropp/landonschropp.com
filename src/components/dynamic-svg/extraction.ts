import { DynamicSVGShape, DynamicSVGRow, DynamicSVGAspect } from "../../types";
import { recursivelyExtractType } from "../../utilities/introspection";
import { Aspect } from "./aspect";
import { Row } from "./row";
import { Shape } from "./shape";
import { ReactNode } from "react";

/**
 * Given a React node, this function extracts the shapes and their metadata from the
 * child components.
 * @param node The react node to extract the shapes from.
 * @returns An array of shapes and their metadata.
 */
export function extractShapes(node: ReactNode): DynamicSVGShape[] {
  return recursivelyExtractType(node, Shape, ({ key, props }) => {
    if (!key) {
      throw new Error("A key is required for each shape.");
    }

    return { ...props, key };
  });
}

/**
 * Given a React node, this function extracts the rows and their metadata from the
 * child components.
 * @param node The react node to extract the rows from.
 * @returns An array of rows and their metadata.
 */
export function extractRows(node: ReactNode): DynamicSVGRow[] {
  return recursivelyExtractType(node, Row, ({ key, props: { children, ...props } }) => {
    if (!key) {
      throw new Error("A key is required for each row.");
    }

    return { ...props, key, shapes: extractShapes(children) };
  });
}

/**
 * Given a React node, this function extracts the aspects and their metadata from the
 * child components.
 * @param node The react node to extract the aspects from.
 * @returns An array of aspects and their metadata.
 */
export function extractAspects(node: ReactNode): DynamicSVGAspect[] {
  return recursivelyExtractType(node, Aspect, ({ key, props: { children, ...props } }) => {
    if (!key) {
      throw new Error("A key is required for each aspect.");
    }

    return { ...props, key, rows: extractRows(children) };
  });
}
