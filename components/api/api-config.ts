import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";
import { provider } from "../provider/provider"

const appLabels = { app: 'jobsbolt', component: 'api' };
const config = loadConfig()

export const apiConfigMap = new k8s.core.v1.ConfigMap('jobsbolt-api-config', {
  metadata: {
    name: 'jobsbolt-api-config',
    labels: appLabels,
  },
  data: {
    TYPEORM_TYPE: config.api.TYPEORM_TYPE,
    TYPEORM_HOST: config.api.TYPEORM_HOST,
    TYPEORM_PORT: config.api.TYPEORM_PORT,
    TYPEORM_USERNAME: config.api.TYPEORM_USERNAME,
    TYPEORM_DATABASE: config.api.TYPEORM_DATABASE,
    SEEDER_NAME: config.api.SEEDER_NAME,
    SEEDER_EMAIL: config.api.SEEDER_EMAIL,
    GENERAL_TEST: config.api.GENERAL_TEST,
    FIND_JOB: config.api.FIND_JOB,
    TEST_BATCH: config.api.TEST_BATCH,
    DISCORD_TEST: config.api.DISCORD_TEST,
    FULL_TEST: config.api.FULL_TEST,
    RABBITMQ_USERNAME: config.api.RABBITMQ_USERNAME,
    RABBITMQ_URL: config.rabbitmq.RABBITMQ_URL,
    API_URL: config.api.API_URL,
    WEBSITE_URL: config.api.WEBSITE_URL,
    NODE_ENV: config.api.NODE_ENV,
  }
}, { provider: provider })
