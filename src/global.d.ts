// TODO: Can we remove this override?
declare module "svg-path-bounds" {
  export default (path: string) => [number, number, number, number];
}

declare module "virtual:book-covers" {
  export const availableIsbns: Set<number>;
}
