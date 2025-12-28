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

- Aim for atomic commits, with commits representing single, self-contained changes.

## Architecture Overview

This is a static site built with **TanStack Start**, **React**, **Vite**, and **Tailwind CSS**. Content is authored in Markdown files using Obsidian and stored locally on the filesystem.

### Directory Structure

- `src/routes/` - TanStack Router file-based routes
- `src/components/` - React components organized by feature
- `src/data/` - Content loading and processing logic for articles, notes, and TILs
- `src/schema/` - Zod schemas for content validation and parsing
- `src/utilities/` - Shared utility functions
- `src/styles/` - CSS including `prose/` subdirectory for markdown content styling
- `src/hooks/` - React hooks
- `src/types/` - TypeScript type definitions

### Content Pipeline

Content flows through a unified pipeline:

1. Markdown files with frontmatter are read from filesystem paths (configured via env vars)
2. Content is parsed using Zod schemas (`src/schema/`)
3. Data loaders in `src/data/` fetch and transform content
4. Components in `src/components/` render the content

Content types:

- **Articles** (`src/data/articles.ts`, `src/schema/article.ts`)
- **Notes** (`src/data/notes.ts`, `src/schema/note.ts`)
- **Today I Learned** (`src/data/today-i-learned.ts`, `src/schema/today-i-learned.ts`)

### Dynamic SVG System

`src/components/dynamic-svg/` contains a custom system for generating responsive, animated SVG graphics for the homepage. SVG files are processed through SVGR plugin configured in `vite.config.ts`.

### Testing

- **Standards**: Fetch the test standards from the `ls` MCP server's `doc://test` resource.
- **Framework**: Vitest with React Testing Library
- **Config**: `vitest.config.ts` with jsdom environment
- **Setup**: `test/create-server-fn.ts` for TanStack Start server function mocking
- Tests are co-located with source files using `.test.ts` or `.test.tsx` extensions
- Run single test: `pnpm test [path]`
- Do not run tests with `NODE_ENV=test`. It's set automatically. I REPEAT, DO NOT RUN TESTS WITH
  `NODE_ENV=test`.

### Styling

- **Framework**: Tailwind CSS 4.x via `@tailwindcss/vite` plugin
- **Prose styles**: Granular CSS modules in `src/styles/prose/` for markdown rendering
- Styles for specific markdown elements (code blocks, tables, blockquotes, etc.) are separated into individual CSS files

### Code Quality

- **TypeScript**: Strict mode enabled with comprehensive compiler options
- **ESLint**: Zero warnings policy enforced
- **Prettier**: Code formatting with import sorting
- **Husky + lint-staged**: Pre-commit hooks run linting, type checking, and formatting on staged files

### Key Libraries

- **es-toolkit**: Modern utility library (replacing lodash/remeda)
- **ts-dedent**: For formatting multi-line strings with proper indentation
- **date-fns**: Date manipulation
- **highlight.js**: Syntax highlighting for code blocks
- **markdown-it**: Markdown parsing with callouts plugin
- **Zod**: Runtime schema validation
