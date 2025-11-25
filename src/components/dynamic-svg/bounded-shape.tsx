import { BoundedDynamicSVGShape } from "@/types";

type BoundedShapeProps = {
  /** The bounded shape to display. */
  boundedShape: BoundedDynamicSVGShape;
};

/**
 * This component includes the shape that's actually rendered to the dynamic SVG. It is not meant to
 * be used directly—instead, use `DynamicSVG.Row` and `DynamicSVG.Shape`.
 */
export function BoundedShape({ boundedShape: { bounds, ...shape } }: BoundedShapeProps) {
  const maskId = `${shape.key}-mask`;

  // Determine the scale by comparing the original shape's width to the bounded shape's width.
  const scale = bounds.width / shape.originalWidth;

  // NOTE: In the SVG spec, the transforms are applied _right-to-left_, so the translation must be
  // listed before the scale.
  return (
    <>
      {/*
        Using a rect here and applying a make to it accomplishes two things at once:

        - The mask shape can be transformed without affecting the fill. This prevents distortion to
          the fill as they're transformed to different scales.
        - The rect provides a square click target that properly highlights when moused over. This is 
          not the case for a normal path—only visible parts of the path will trigger a hover.
      */}
      <rect
        {...bounds}
        className="[a:focus-visible_&]:fill-cornflower [a:hover_&]:fill-cornflower fill-[url('#dynamic-svg-background')]"
        fill="url('#dynamic-svg-background')"
        mask={`url(#${maskId})`}
      />
      <mask id={maskId}>
        <g
          transform={`translate(${bounds.x}, ${bounds.y}) scale(${scale})`}
          dangerouslySetInnerHTML={{ __html: shape.content }}
        />
      </mask>
    </>
  );
}
