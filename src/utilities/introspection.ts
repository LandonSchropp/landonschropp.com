import {
  Children,
  cloneElement,
  ComponentType,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";

/**
 * Determines if the provided node is a React element of the given component type.
 * @param node The node to check.
 * @param type The component type to check the node against.
 * @returns Whether the provided node is a React element of the provided type.
 */
function isElementOfType<T>(node: ReactNode, type: ComponentType<T>): node is ReactElement<T> {
  return isValidElement(node) && node.type === type;
}

/**
 * Type guard that asserts that the provided node has children. This guard probably doesn't work in
 * _every_ possible circumstance—for example, it doesn't bother to verify that the children are
 * anything other than `ReactElement`'s. However, it's good enough for the purposes of this project.
 * @param node The node to check.
 * @returns Whether the provided node has children.
 */
function hasChildren(node: ReactNode): node is ReactElement<{ children: ReactNode }> {
  return (
    isValidElement(node) &&
    typeof node.props === "object" &&
    node.props !== null &&
    "children" in node.props &&
    (isValidElement(node.props.children) ||
      (Array.isArray(node.props.children) && node.props.children.every(isValidElement)))
  );
}

/**
 * Returns the children of the given React element.
 * @param node The React element to check.
 * @returns The children contained in the provided node. If the node does not have any children, an
 * empty array will be returned instead. Is the node is already an array, it will be returned as is.
 */
function extractChildren(node: ReactNode): ReactNode[] {
  if (Array.isArray(node)) {
    return node;
  }

  if (hasChildren(node)) {
    return Children.toArray(node.props.children);
  }

  return [];
}

/**
 * Recursively extracts and transforms the elements of the given type which are ancestors of the
 * provided node.
 * @param node The React element to recursively transform.
 * @param type The component type to extract and transform.
 * @param transform The transformation function to apply to the extracted elements.
 * @returns The transformed elements of the provided type.
 */
export function recursivelyExtractType<R, T>(
  node: ReactNode,
  type: ComponentType<T>,
  transform: (node: ReactElement<T>) => R,
): R[] {
  if (isElementOfType(node, type)) {
    return [transform(node)];
  }

  return extractChildren(node).flatMap((child) => {
    return recursivelyExtractType(child, type, transform);
  });
}

/**
 * Recursively transforms and replaces the elements of the given type which are ancestors of the
 * provided node.
 * @param element The React element to recursively transform.
 * @param type The component type to replace.
 * @param transform The transformation function to apply to the replaced elements.
 * @returns The transformed elements of the provided type.
 */
export function recursivelyReplaceType<T>(
  element: ReactNode,
  type: ComponentType<T>,
  transform: (node: ReactElement<T>) => ReactNode,
): ReactNode {
  if (isElementOfType(element, type)) {
    return transform(element);
  }

  if (Array.isArray(element)) {
    return element.map((child) => recursivelyReplaceType(child, type, transform));
  }

  if (!isValidElement(element)) {
    return element;
  }

  const children = extractChildren(element).flatMap((child) => {
    return recursivelyReplaceType(child, type, transform);
  });

  return cloneElement(element, {}, ...children);
}
