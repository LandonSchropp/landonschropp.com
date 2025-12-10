import {
  DynamicSVGShape,
  BoundedDynamicSVGShape,
  Size,
  BoundedDynamicSVGRow,
  BoundedDynamicSVGAspect,
  DynamicSVGAspect,
  DynamicSVGRow,
} from "../../types";
import { calculateBounds } from "./bounds";
import { clamp } from "es-toolkit";
import { maxBy, sum, sumBy } from "es-toolkit";

/**
 * Given an array of shapes, this function distributes them in a horizontal row.
 * @param shapes The shapes to scale and distribute.
 * @param spacing The spacing between each shape, represented as a percentage of the max height of
 * the shapes.
 * @returns The transformed shapes.
 */
function distributeShapesHorizontally(
  shapes: DynamicSVGShape[],
  spacing: number,
  align: DynamicSVGRow["align"],
): BoundedDynamicSVGShape[] {
  const rowHeight = Math.max(...shapes.map(({ originalHeight }) => originalHeight));
  const spacingWidth = rowHeight * spacing;

  return shapes.reduce((accumulator, shape) => {
    accumulator.push({
      ...shape,
      bounds: {
        width: shape.originalWidth,
        height: shape.originalHeight,
        x: sumBy(accumulator, ({ bounds: { width } }) => width + spacingWidth),
        y: align === "top" ? 0 : (rowHeight - shape.originalHeight) / 2,
      },
    });

    return accumulator;
  }, [] as BoundedDynamicSVGShape[]);
}

/**
 * Given an array of shapes, this function scales and distributes them vertically to fit within the
 * @param boundedShapes The shapes to scale and distribute.
 * @param width The width to fit the shapes within.
 * @returns The transformed shapes.
 */
function scaleShapesToWidth(
  boundedShapes: BoundedDynamicSVGShape[],
  width: number,
): BoundedDynamicSVGShape[] {
  const minX = Math.min(...boundedShapes.map(({ bounds }) => bounds.x));
  const maxX = Math.max(...boundedShapes.map(({ bounds }) => bounds.x + bounds.width));
  const rowWidth = maxX - minX;
  const scale = width / rowWidth;

  return boundedShapes.map(({ bounds, ...shape }) => {
    return {
      ...shape,
      bounds: {
        x: bounds.x * scale,
        y: bounds.y,
        width: bounds.width * scale,
        height: bounds.height * scale,
      },
    };
  });
}

/**
 * Given an array of rows, this function distributes them vertically across the given height using the provided spacing.
 * @param rows The rows to distribute.
 * @param size The size of the container.
 * @param minSpacing The minimum spacing between each row. The spacing is expressed as a percentage
 * of the width of the container.
 * @param maxSpacing The maximum spacing between each row. The spacing is expressed as a percentage
 * of the width of the container.
 * @returns The transformed shapes distributed into rows.
 */
function distributeRowsVertically(
  rows: BoundedDynamicSVGRow[],
  size: Size,
  minSpacing: number,
  maxSpacing: number,
): BoundedDynamicSVGRow[] {
  const rowsHeight = sum(rows.map(({ bounds: { height } }) => height));

  const minSpacingHeight = size.width * minSpacing;
  const maxSpacingHeight = size.width * maxSpacing;

  const calculatedSpacingHeight = (size.height - rowsHeight) / (rows.length - 1);
  const spacingHeight = clamp(calculatedSpacingHeight, minSpacingHeight, maxSpacingHeight);

  return rows.map((row, index) => {
    const baseY = sumBy(rows.slice(0, index), (row) => row.bounds.height + spacingHeight);

    const boundedShapes = row.boundedShapes.map(({ bounds, ...shape }) => {
      return { ...shape, bounds: { ...bounds, y: baseY + bounds.y } };
    });

    return {
      ...row,
      bounds: { ...row.bounds, y: baseY },
      boundedShapes,
    };
  });
}

/**
 * Returns the portion of the provided size that the aspect consumes. If the aspect is taller than
 * the size, the aspect is scaled down to fit within the size.
 * @param aspect The aspect to calculate the area percentage for.
 * @param size The size that contains the aspect.
 * @returns The percentage of the size that the aspect consumes.
 */
function calculateAspectAreaPercentage(aspect: BoundedDynamicSVGAspect, size: Size): number {
  const scale = size.height < aspect.bounds.height ? size.height / aspect.bounds.height : 1;
  return (aspect.bounds.width * scale * aspect.bounds.height * scale) / (size.width * size.height);
}

/**
 * Given a row and the size of the container, this function calculates the layout of the row.
 * @param row The row to calculate the layout for.
 * @param size The size of the container.
 * @returns The bounded layout of the row.
 */
function calculateBoundedRow(row: DynamicSVGRow, size: Size): BoundedDynamicSVGRow {
  const distributedShapes = distributeShapesHorizontally(row.shapes, row.spacing, row.align);
  const scaledShapes = scaleShapesToWidth(distributedShapes, size.width);

  return {
    key: row.key,
    bounds: calculateBounds(scaledShapes),
    boundedShapes: scaledShapes,
  };
}

/**
 * Given an aspect and the size of the container, this function calculates the layout of the aspect.
 * @param aspect The aspect to calculate the layout for.
 * @param size The size of the container.
 * @returns The bounded layout of the aspect.
 */
function calculateBoundedAspect(
  { key, rows, minSpacing, maxSpacing }: DynamicSVGAspect,
  size: Size,
): BoundedDynamicSVGAspect {
  const scaledRows = rows.map((row) => calculateBoundedRow(row, size));
  const boundedRows = distributeRowsVertically(scaledRows, size, minSpacing, maxSpacing);

  return {
    key,
    bounds: calculateBounds(boundedRows),
    boundedRows,
  };
}

/**
 * Given an array of aspects and the size of the container, this function calculates the layout of
 * each aspect, and then selects the aspect that takes up the most space within the container.
 * @param aspects The aspects to calculate and select from.
 * @param size The size of the container.
 * @returns The aspect that takes up the most space within the container.
 */
export function calculateAndSelectAspect(
  aspects: DynamicSVGAspect[],
  size: Size,
): BoundedDynamicSVGAspect {
  const boundedAspects = aspects.map((aspect) => calculateBoundedAspect(aspect, size));

  const aspect = maxBy(boundedAspects, (boundedAspect) =>
    calculateAspectAreaPercentage(boundedAspect, size),
  );

  if (!aspect) {
    throw new Error("No aspects were provided.");
  }

  return aspect;
}
