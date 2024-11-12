import * as pulumi from "@pulumi/pulumi";
import { z } from "zod";
import { rabbitmqSchema } from "./schema/rabbitmq-schema";
import { apiSchema } from "./schema/api-schema";
import { envSchema } from "./schema/env-schema";

import * as dotenv from 'dotenv';
import path = require("path");

const stack = pulumi.getStack();

console.log(stack)
if (stack === 'local') {
  dotenv.config({ path: '../../env/local/.env' });
} else if (stack === 'dev') {
  dotenv.config({ path: path.resolve(__dirname, '../../env/dev/.env') });
}

export const loadConfig = () => {
  const config = new pulumi.Config('jobsbolt');

  const combinedSchema = z.object({
    api: apiSchema,
    rabbitmq: rabbitmqSchema,
    env: envSchema
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
    env: {
      // AZURE
      KUBERNETES_VERSION: config.require("kubernetesVersion"),
      NODE_VM_SIZE: config.require("nodeVmSize"),
      NUM_WORKER_NODES: config.requireNumber("numWorkerNodes"),
      PREFIX_FOR_DNS: config.require("prefixForDns"),
      MGMT_GROUP_ID: config.require("mgmtGroupId"),
      SSH_PUB_KEY: config.require("sshPubKey"),

      // API
      API_DEPLOYMENT_REPLICAS: config.requireNumber("api_deployment_replicas"),
      API_DEPLOYMENT_CONTAINER_IMAGE: config.require("api_deployment_containerImage"),
      API_DEPLOYMENT_RESOURCES_REQUESTS_CPU: config.require("api_deployment_resources_requests_cpu"),
      API_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: config.require("api_deployment_resources_requests_memory"),
      API_DEPLOYMENT_RESOURCES_LIMITS_CPU: config.require("api_deployment_resources_limits_cpu"),
      API_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: config.require("api_deployment_resources_limits_memory"),

      // Grafana
      GRAFANA_DEPLOYMENT_REPLICAS: config.requireNumber("grafana_deployment_replicas"),
      GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_CPU: config.require("grafana_deployment_resources_requests_cpu"),
      GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: config.require("grafana_deployment_resources_requests_memory"),
      GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_CPU: config.require("grafana_deployment_resources_limits_cpu"),
      GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: config.require("grafana_deployment_resources_limits_memory"),
      GRAFANA_PVC_STORAGE: config.require("grafana_pvc_storage"),

      // Postgres
      POSTGRES_DEPLOYMENT_REPLICA: config.requireNumber("postgres_deployment_replica"),
      POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_CPU: config.require("postgres_deployment_resources_requests_cpu"),
      POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: config.require("postgres_deployment_resources_requests_memory"),
      POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_CPU: config.require("postgres_deployment_resources_limits_cpu"),
      POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: config.require("postgres_deployment_resources_limits_memory"),
      POSTGRES_PVC_STORAGE: config.require("postgres_pvc_storage"),

      // Prometheus
      PROMETHEUS_DEPLOYMENT_REPLICAS: config.requireNumber("prometheus_deployment_replicas"),
      PROMETHEUS_DEPLOYMENT_CONTAINER_IMAGE: config.require("prometheus_deployment_containerImage"),
      PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_CPU: config.require("prometheus_deployment_resources_requests_cpu"),
      PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: config.require("prometheus_deployment_resources_requests_memory"),
      PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_CPU: config.require("prometheus_deployment_resources_limits_cpu"),
      PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: config.require("prometheus_deployment_resources_limits_memory"),
      PROMETHEUS_PVC_STORAGE: config.require("prometheus_pvc_storage"),

      // RabbitMQ
      RABBITMQ_DEPLOYMENT_REPLICAS: config.requireNumber("rabbitmq_deployment_replicas"),
      RABBITMQ_DEPLOYMENT_CONTAINER_IMAGE: config.require("rabbitmq_deployment_containerImage"),
      RABBITMQ_DEPLOYMENT_RESOURCES_REQUESTS_CPU: config.require("rabbitmq_deployment_resources_requests_cpu"),
      RABBITMQ_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: config.require("rabbitmq_deployment_resources_requests_memory"),
      RABBITMQ_DEPLOYMENT_RESOURCES_LIMITS_CPU: config.require("rabbitmq_deployment_resources_limits_cpu"),
      RABBITMQ_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: config.require("rabbitmq_deployment_resources_limits_memory"),
    }
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