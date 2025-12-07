/** The coordinates of an object. */
export type Coordinates = {
  /** The x-coordinate of the object. */
  x: number;

  /** The y-coordinate of the object. */
  y: number;
};

/** Represents the size of a rectangle. */
export type Size = {
  /** The width of the rectangle. */
  width: number;

  /** The height of the rectangle. */
  height: number;
};

/** The bounds of an object. */
export type Bounds = Coordinates & Size;

/** Represents a raw SVG shape's data. */
export type DynamicSVGShape = {
  /** The unique identifier of the shape. */
  key: string;

  /** The untransformed width of the shape. */
  originalWidth: number;

  /** The untransformed height of the shape. */
  originalHeight: number;

  /** The inner HTML of the shape to render. */
  content: string;
};

/** Represents a row of shapes in an aspect. */
export type DynamicSVGRow = {
  /** The unique identifier of the row. */
  key: string;

  /** The space between each shape in the row, represented as a percentage of the row. */
  spacing: number;

  /** The way that shapes are aligned within the row. */
  align: "top" | "middle";

  /** The shapes contained in the row. */
  shapes: DynamicSVGShape[];
};

/** One possible layout of shapes in the SVG. */
export type DynamicSVGAspect = {
  /** The unique identifier of the aspect. */
  key: string;

  /** The shapes contained in the aspect. */
  rows: DynamicSVGRow[];

  /**
   * The minimum spacing between the shapes, expressed as a percentage of the width of the aspect.
   */
  minSpacing: number;

  /**
   * The maximum spacing between the shapes, expressed as a percentage of the width of the aspect.
   */
  maxSpacing: number;
};

/** An object that has bounds. */
export type BoundedObject = {
  /** The bounds of the object. */
  bounds: Bounds;
};

/** A shape that has been transformed by scaling and translating it. */
export type BoundedDynamicSVGShape = DynamicSVGShape & BoundedObject;

/** A row that contains transformed shapes and bounds. */
export type BoundedDynamicSVGRow = BoundedObject & {
  /** The unique identifier of the row. */
  key: string;

  /** The bounded shapes contained in the row. */
  boundedShapes: BoundedDynamicSVGShape[];
};

/** An aspect that contains transformed rows and bounds. */
export type BoundedDynamicSVGAspect = BoundedObject & {
  /** The unique identifier of the aspect. */
  key: string;

  /** The bounded rows contained in the aspect. */
  boundedRows: BoundedDynamicSVGRow[];
};
