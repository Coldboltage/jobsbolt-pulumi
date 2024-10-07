import * as pulumi from "@pulumi/pulumi";
import { z } from "zod";
import { rabbitmqSchema } from "./schema/rabbitmq-schema";
import { apiSchema } from "./schema/api-schema";
import * as dotenv from 'dotenv';
dotenv.config({ path: './../.env' });


export const loadConfig = () => {
  const config = new pulumi.Config('jobsbolt');

  const combinedSchema = z.object({
    api: apiSchema,
    rabbitmq: rabbitmqSchema
  });

  function getRequiredSecretEnvVar(varName: string): pulumi.Output<string> {
    const value = process.env[varName];
    if (value === undefined) {
      throw new Error(`${varName} environment variable is required but not defined.`);
    }
    return pulumi.secret(value);
  }

  const extractedConfig = {
    api: {
      API_URL: config.require("API_URL"),
      RABBITMQ_URL: config.require("RABBITMQ_URL"),
      RABBITMQ_USERNAME: config.require("RABBITMQ_USERNAME"),
      TYPEORM_TYPE: config.require("TYPEORM_TYPE"),
      TYPEORM_DATABASE: config.require("TYPEORM_DATABASE"),
      TYPEORM_HOST: config.require("TYPEORM_HOST"),
      TYPEORM_PORT: config.require("TYPEORM_PORT"),
      TYPEORM_USERNAME: config.require("TYPEORM_USERNAME"),
      GENERAL_TEST: config.require("GENERAL_TEST"),
      FIND_JOB: config.require("FIND_JOB"),
      TEST_BATCH: config.require("TEST_BATCH"),
      DISCORD_TEST: config.require("DISCORD_TEST"),
      FULL_TEST: config.require("FULL_TEST"),
      SEEDER_NAME: config.require("SEEDER_NAME"),
      SEEDER_EMAIL: config.require("SEEDER_EMAIL"),
      SEEDER_PASSWORD: getRequiredSecretEnvVar("SEEDER_PASSWORD"),
      JWT_SECRET: getRequiredSecretEnvVar("JWT_SECRET"),
      OPENAI_API_KEY: getRequiredSecretEnvVar("OPENAI_API_KEY"),
      DISCORD_KEY: getRequiredSecretEnvVar("DISCORD_KEY"),
      SENTRY_DSN: getRequiredSecretEnvVar("SENTRY_DSN"),
      SENTRY_AUTH_TOKEN: getRequiredSecretEnvVar("SENTRY_AUTH_TOKEN"),
      TYPEORM_PASSWORD: getRequiredSecretEnvVar("TYPEORM_PASSWORD"),
      RABBITMQ_PASSWORD: getRequiredSecretEnvVar("RABBITMQ_PASSWORD"),

    },
    rabbitmq: {
      RABBITMQ_REPLICA: config.require("RABBITMQ_REPLICA"),
      RABBITMQ_URL: config.require("RABBITMQ_URL"),
      RABBITMQ_PASSWORD: getRequiredSecretEnvVar("RABBITMQ_PASSWORD"),
    },
  };

  const validatedConfig = combinedSchema.safeParse(extractedConfig);

  if (!validatedConfig.success) {
    const errorMessages = validatedConfig.error.errors.map(e => e.message).join(", ");

    for (const error of validatedConfig.error.errors) {
      console.error(error);
    }
    throw new Error(errorMessages);
  }

  return validatedConfig.data;
}