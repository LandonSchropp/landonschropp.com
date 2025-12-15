import { Bounds, BoundedObject } from "../../types";

/**
 * Determines the boundary rectangle containing all of the provided objects.
 * @param objects The bounded objects to get the boundaries of.
 * @returns The boundary rectangle containing all of the objects.
 */
export function calculateBounds(objects: BoundedObject[]): Bounds {
  const x = Math.min(...objects.map(({ bounds: { x } }) => x));
  const y = Math.min(...objects.map(({ bounds: { y } }) => y));
  const width = Math.max(...objects.map(({ bounds: { x, width } }) => x + width)) - x;
  const height = Math.max(...objects.map(({ bounds: { y, height } }) => y + height)) - y;

  return { x, y, width, height };
}
