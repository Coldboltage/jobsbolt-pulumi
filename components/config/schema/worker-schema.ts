import { z } from "zod"

const workerSchema = z.object({
  JWT_TOKEN: z.any().refine(value => value !== undefined, "JWT_SECRET is required"),
})

export { workerSchema }