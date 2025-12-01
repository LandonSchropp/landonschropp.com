"use client";

import { Size } from "../types";
import { RefObject, useLayoutEffect, useState } from "react";

/**
 * Returns the size of the element contained in the ref. This implementation uses a `ResizeObserver`
 * to observe the element's size and update the size state accordingly.
 * @param ref The element to measure.
 * @returns The size of the ref's element.
 */
export function useSize(ref: RefObject<Element | null>): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  // This uses `useLayoutEffect` to ensure that the size of the component is returned _before_ the
  // screen is painted, allowing the size to be used during rendering calculations.
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return size;
}
