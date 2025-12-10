/**
 * Checks if the given value is an object (and not null).
 * @param value - The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}
