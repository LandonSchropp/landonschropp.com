import { createServerOnlyFn } from "@tanstack/react-start";

/**
 * Fetches the value of an environment variable on the server.
 * @param name The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws If the environment variable is not set.
 */
export const fetchEnvironmentVariable = createServerOnlyFn((name: string): string => {
  if (typeof process.env[name] !== "string") {
    throw new Error(`The '${name}' environment variable must be set.`);
  }

  return process.env[name];
});
