"use client";

import { RefObject, useCallback, useEffect } from "react";

/**
 * Calls the provided callback when a click occurs outside the element referenced by the ref.
 * @param ref The element to monitor for outside clicks.
 * @param callback The function to call when a click occurs outside the ref's element.
 */
export function useClickOutside(ref: RefObject<HTMLElement | null>, callback: () => void): void {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
}
