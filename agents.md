Provides guidance to AI agents when working with code in this repository. First, read @readme.md.

## Guidelines

- Environment variables for content paths must be configured in `mise.toml` file.
- Always run `pnpm lint` and `pnpm check-types` after making code changes to ensure code quality.
- Use `ts-dedent` for formatting multi-line strings with proper indentation. This preserves readability in code while maintaining clean output.

  ```typescript
  // Bad
  it("does not have properly indented content", () => {
    const message = `
  Error parsing ${target}:
  ${error.message}
    `;
  });
  ```

  ```typescript
  // Good
  import { dedent } from "ts-dedent";

  it("does not have properly indented content", () => {
    const message = dedent`
      Error parsing ${target}:
      ${error.message}
    `;
  });
  ```

## Architecture Overview

### Content Structure

- **Articles**: Blog posts stored in `$ARTICLES_PATH` (env variable)
- **Notes**: Knowledge base content in `$NOTES_PATH` (env variable)
- **Today I Learned**: Short form content in `$TODAY_I_LEARNED_PATH` (env variable)

All content types support frontmatter and are processed through a unified content pipeline.

### Key Directories

- `src/app/`: Next.js App Router pages and layouts
- `src/components/`: React components organized by feature
- `src/data/`: Content loading and processing logic
- `src/schema/`: Zod schemas for content validation
- `src/utilities/`: Shared utility functions
- `src/styles/content/`: Markdown content styling

### Dynamic SVG System

The site includes a custom dynamic SVG rendering system in `src/components/dynamic-svg/` that generates responsive, animated SVG graphics for the homepage.

### Configuration

- **Next.js**: Static export mode with custom Webpack config for SVG handling
- **Jest**: Uses jsdom environment with `@/` path mapping to `src/`
- **TypeScript**: Strict configuration with separate Jest tsconfig
- **ESLint**: Zero warnings policy with Next.js, React, and Jest plugins
