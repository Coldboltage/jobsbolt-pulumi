import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";

// Load the validated config
const postgresConfig = loadConfig().api
const appLabels = { app: 'jobsbolt', component: 'postgres' };

export const postgresConfigMap = new k8s.core.v1.ConfigMap("jobsbolt-postgres-config-map", {
  metadata: {
    name: "jobsbolt-postgres-config",
    labels: appLabels,
  },
  data: {
    TYPEORM_USERNAME: postgresConfig.TYPEORM_USERNAME,
    TYPEORM_DATABASE: postgresConfig.TYPEORM_DATABASE,
  },
})

