import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_BASE_URL: z.string(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string(),
  },
  runtimeEnv: {
    API_BASE_URL: process.env.API_BASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
});
