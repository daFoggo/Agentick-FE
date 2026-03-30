import "@tanstack/react-start/server-only"
import { z } from "zod"
import { createServerOnlyFn } from "@tanstack/react-start"

/**
 * @description Environment variables schema and validation
 * Strictly follows TanStack Start documentation patterns.
 */

const serverEnvSchema = z.object({
  DATABASE_URL: z.url(),
  OPEN_AI_API_KEY: z.string().min(1),
  SELINE_TOKEN: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
})

const clientEnvSchema = z.object({
  VITE_BACKEND_URL: z.url(),
  VITE_APP_NAME: z.string().default("Agentick App"),
})

// 1. Client environment (validated on both client and server during hydration)
export const clientEnv = clientEnvSchema.parse(import.meta.env)

// 2. Server environment (protected by createServerOnlyFn)
// This function will throw a hard error if called from client-side code.
export const getServerEnv = createServerOnlyFn(() => {
  return serverEnvSchema.parse(process.env)
})
