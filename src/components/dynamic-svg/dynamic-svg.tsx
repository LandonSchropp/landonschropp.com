import { Aspect } from "./aspect";
import { BoundedAspect } from "./bounded-aspect";
import { calculateBounds } from "./bounds";
import { calculateAndSelectAspect } from "./calculations";
import { extractAspects } from "./extraction";
import { Group } from "./group";
import { Link } from "./link";
import { Row } from "./row";
import { Shape } from "./shape";
import { useSize } from "@/hooks/use-size";
import flannel from "@/images/flannel.png";
import { useRef } from "react";

const PATTERN_SIZE_MULTIPLIER = 0.1;

export type DynamicSVGProps = {
  /**
   * The content of the dynamic SVG. In order to use the dynamic layout mechanism, you must include
   * `DynamicSVG.Shape` components wrapped in `DynamicSVG.Row`'s.
   */
  children: React.ReactNode;
};

/**
 * This component combines several SVG shapes with a specialized, dynamic layout. It organizes the
 * shapes into rows with the provided spacing, automatically resizing them so that each row takes up
 * the full width of the container. The rows are then distributed vertically to take up as much
 * space as possible within the constraints of the provided space.
 *
 * The goal is to enable you to intuitively add content to a SVG, surrounding it by markup, and let
 * the component decide exactly how the shapes should be positioned. To achieve this, this component
 * uses React's `Children` API to introspect the contents of the rows. This leaves you free to wrap
 * the shapes in whatever SVG markup you'd like, and that markup will be preserved when the shape is
 * rendered.
 */
export function DynamicSVG({ children }: DynamicSVGProps) {
  // NOTE: The overall design of this component ended up getting somewhat complex. Using nested
  // components to define the layout of the component's content necessitated the use of the `Children`
  // API. However, I believe the extra complexity is worth it for the flexibility it provides. With
  // this approach, I can easily define the structure of the rendered SVG with other components,
  // including things like additional markup, aria-attributes and links with little trouble.

  const svgRef = useRef<SVGSVGElement>(null);
  const size = useSize(svgRef);
  const patternSize = Math.sqrt(size.width * size.height) * PATTERN_SIZE_MULTIPLIER;

  const aspects = extractAspects(children);
  const aspect = calculateAndSelectAspect(aspects, size);
  const viewBoxHeight = calculateBounds(aspect.boundedRows).height;

  return (
    <main className="flex h-full p-[3vw] *:flex-[0_0_auto]">
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size.width} ${viewBoxHeight}`}
        ref={svgRef}
      >
        <defs>
          <pattern
            id="dynamic-svg-background"
            patternUnits="userSpaceOnUse"
            width={patternSize}
            height={patternSize}
          >
            <image href={flannel} x={0} y={0} width={patternSize} height={patternSize} />
          </pattern>
        </defs>

        <BoundedAspect boundedAspect={aspect}>{children}</BoundedAspect>
      </svg>
    </main>
  );
}

DynamicSVG.Aspect = Aspect;
DynamicSVG.Group = Group;
DynamicSVG.Link = Link;
DynamicSVG.Row = Row;
DynamicSVG.Shape = Shape;
