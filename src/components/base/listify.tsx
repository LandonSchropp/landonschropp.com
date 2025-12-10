import { last } from "es-toolkit";
import type { ReactNode } from "react";

function intersperse<T, U>(array: T[], separator: U): (T | U)[] {
  return array.flatMap((item) => [item, separator]).slice(0, -1);
}

type ListifyProps = {
  items: React.ReactNode[];
};

export function Listify({ items }: ListifyProps): ReactNode {
  if (items.length === 0) {
    return null;
  }

  if (items.length === 1) {
    return items[0];
  }

  return [...intersperse(items.slice(0, -1), ", "), " and ", last(items)];
}
