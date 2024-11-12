import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";
import { provider } from "../azure/aks-deployment"

const appLabels = { app: 'jobsbolt', component: 'postgres' };
const config = loadConfig()


export const postgresSecret = new k8s.core.v1.Secret('jobsbolt-postgres-secret', {
  metadata: {
    name: 'jobsbolt-postgres-secret',
    labels: appLabels,
  },
  stringData: {
    TYPEORM_PASSWORD: config.api.TYPEORM_PASSWORD,
  }
}, { provider: provider })

