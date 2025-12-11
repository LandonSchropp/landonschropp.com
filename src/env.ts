import { createServerOnlyFn } from "@tanstack/react-start";

const fetchEnvironmentVariable = createServerOnlyFn((name: string): string => {
  if (typeof process.env[name] !== "string") {
    throw new Error(`The '${name}' environment variable must be set.`);
  }

  return process.env[name];
});

/** The path to the notes directory. */
export const NOTES_PATH = fetchEnvironmentVariable("NOTES_PATH");

/** The path to the articles directory. */
export const ARTICLES_PATH = fetchEnvironmentVariable("ARTICLES_PATH");

/** The path to the Today I Learned directory. */
export const TODAY_I_LEARNED_PATH = fetchEnvironmentVariable("TODAY_I_LEARNED_PATH");
