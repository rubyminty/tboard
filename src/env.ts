import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    DATABASE_URL: z.string().url(),
    DISCORD_ID: z.string().min(1),
    DISCORD_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: process.env,
});