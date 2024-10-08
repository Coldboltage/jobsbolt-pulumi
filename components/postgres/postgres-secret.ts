import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'postgres' };
const config = loadConfig()

export const postgresSecret = () => {
  return new k8s.core.v1.Secret('jobsbolt-postgres-secret', {
    metadata: {
      name: 'jobsbolt-postgres-secret',
      labels: appLabels,
    },
    stringData: {
      TYPEORM_PASSWORD: config.api.TYPEORM_PASSWORD,
    }
  })
}