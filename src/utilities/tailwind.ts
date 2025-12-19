/**
 * This is a simple utility template function for Tailwind CSS. It's purely used to allow
 * `prettier-plugin-tailwindcss` to format the Tailwind classes in the template literals.
 */
export function tailwind(strings: TemplateStringsArray, ...args: unknown[]): string {
  return String.raw({ raw: strings }, ...args);
}
