import { z } from "zod";

export const rabbitmqSchema = z.object({
  RABBITMQ_REPLICA: z.string(),
  RABBITMQ_URL: z.string(),
  RABBITMQ_PASSWORD: z.any().refine(value => value !== undefined, "RABBITMQ_PASSWORD is required")
})
