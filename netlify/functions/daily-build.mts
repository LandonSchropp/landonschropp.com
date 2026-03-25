import type { Config } from "@netlify/functions";

const BUILD_HOOK_URL = "https://api.netlify.com/build_hooks/6950b38ee2c7fa9f195b12f5";

export default async () => {
  await fetch(BUILD_HOOK_URL, { method: "POST" });
};

export const config: Config = {
  schedule: "0 10 * * *",
};
