import { z } from 'zod'

export const workerSchema = z.object({
  JWT_TOKEN: z.any().refine(value => value !== undefined, "JWT_TOKEN is required"),
})