import { z } from "zod";

const apiSchema = z.object({
  TYPEORM_TYPE: z.enum(["postgres", "mysql", "sqlite", "mariadb", "mssql", "oracle"]),
  TYPEORM_HOST: z.string().min(1, "TYPEORM_HOST is required"),
  TYPEORM_PORT: z.string().regex(/^\d+$/, "TYPEORM_PORT must be a valid number"),
  TYPEORM_USERNAME: z.string().min(1, "TYPEORM_USERNAME is required"),
  TYPEORM_DATABASE: z.string().min(1, "TYPEORM_DATABASE is required"),
  RABBITMQ_URL: z.string().min(1, "RABBITMQ_URL must be a valid URL"),
  GENERAL_TEST: z.enum(["true", "false"]).default("false"),
  FIND_JOB: z.enum(["true", "false"]).default("false"),
  TEST_BATCH: z.enum(["true", "false"]).default("false"),
  DISCORD_TEST: z.enum(["true", "false"]).default("false"),
  FULL_TEST: z.enum(["true", "false"]).default("false"),
  RABBITMQ_USERNAME: z.string().min(1, "RABBITMQ_USERNAME is required"),
  SEEDER_NAME: z.string().min(1, "SEEDER_NAME is required"),
  SEEDER_EMAIL: z.string().min(1, "SEEDER_EMAIL is required"),
  // Using z.any() for secrets because they are Pulumi.Output<string> and not simple strings
  SEEDER_PASSWORD: z.any().refine(value => value !== undefined, "SEEDER_PASSWORD is required"),
  JWT_SECRET: z.any().refine(value => value !== undefined, "JWT_SECRET is required"),
  OPENAI_API_KEY: z.any().refine(value => value !== undefined, "OPENAI_API_KEY is required"),
  DISCORD_KEY: z.any().refine(value => value !== undefined, "DISCORD_KEY is required"),
  SENTRY_DSN: z.any().refine(value => value !== undefined, "SENTRY_DSN is required"),
  SENTRY_AUTH_TOKEN: z.any().refine(value => value !== undefined, "SENTRY_AUTH_TOKEN is required"),
  TYPEORM_PASSWORD: z.any().refine(value => value !== undefined, "TYPEORM_PASSWORD is required"),
  RABBITMQ_PASSWORD: z.any().refine(value => value !== undefined, "RABBITMQ_PASSWORD is required"),

});

export { apiSchema };