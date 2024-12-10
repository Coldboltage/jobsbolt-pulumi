import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'worker' };
const config = loadConfig()

export const workerSecret = new k8s.core.v1.Secret('jobsbolt-worker-secret', {
  metadata: {
    name: 'jobsbolt-worker-secret',
    labels: appLabels,
  },
  stringData: {
    JWT_TOKEN: config.worker.JWT_TOKEN,
  }
})