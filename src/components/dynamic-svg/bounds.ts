import { Bounds, BoundedObject } from "../../types";

/**
 * Translates the object by the given amount.
 * @param object The object containing the coordinates to translate.
 * @param dx The amount to translate the object in the x-direction.
 * @param dy The amount to translate the object in the y-direction.
 * @returns The object with the translated coordinates.
 */
export function translate<T extends BoundedObject>(object: T, dx: number, dy: number): T {
  return {
    ...object,
    bounds: {
      ...object.bounds,
      x: object.bounds.x + dx,
      y: object.bounds.y + dy,
    },
  };
}

/**
 * Scales the object by the given amount.
 * @param object The object containing the size to scale.
 * @param scale The amount to scale the object.
 * @returns The object with the scaled size.
 */
export function scale<T extends BoundedObject>(object: T, scale: number): T {
  return {
    ...object,
    bounds: {
      x: object.bounds.x,
      y: object.bounds.y,
      width: object.bounds.width * scale,
      height: object.bounds.height * scale,
    },
  };
}

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
