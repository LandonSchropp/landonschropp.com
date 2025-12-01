import { DynamicSVGAspect } from "../../types";

type DynamicSVGAspectProps = Omit<DynamicSVGAspect, "rows"> & {
  /** The shapes contained in the aspect, as well as their surrounding markup. */
  children: React.ReactNode;
};

/** An aspect represents one of the possible arrangements of the shapes and markup. */
export function Aspect({ children }: DynamicSVGAspectProps) {
  return children;
}
