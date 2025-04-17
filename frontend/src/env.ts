import { z } from "zod";

const envSchema = z.object({
  MODE:z.enum(["production", "development", "test"]),
  VITE_API_URL: z.string().url(),
  VITE_ENABLE_API_DELAY: z.string().transform((val) => val === "true").optional(),
});

export const env = envSchema.parse(import.meta.env);
