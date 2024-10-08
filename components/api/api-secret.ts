import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";
import { provider } from "../eks/eks-deployment";


const appLabels = { app: 'jobsbolt', component: 'postgres' };
const config = loadConfig()


export const apiSecret = new k8s.core.v1.Secret('jobsbolt-api-secret', {
  metadata: {
    name: 'jobsbolt-api-secret',
    labels: appLabels,
  },
  stringData: {
    TYPEORM_PASSWORD: config.api.TYPEORM_PASSWORD,
    SEEDER_PASSWORD: config.api.SEEDER_PASSWORD,
    RABBITMQ_PASSWORD: config.rabbitmq.RABBITMQ_PASSWORD,
    JWT_SECRET: config.api.JWT_SECRET,
    OPENAI_API_KEY: config.api.OPENAI_API_KEY,
    DISCORD_KEY: config.api.DISCORD_KEY,
    SENTRY_DSN: config.api.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: config.api.SENTRY_AUTH_TOKEN,
  }
}, { provider: provider })

