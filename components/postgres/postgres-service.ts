import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'postgres' };


export const postgresService = new k8s.core.v1.Service('jobsbolt-postgres-service', {
  metadata: {
    name: 'jobsbolt-postgres-service',
    labels: appLabels
  },
  spec: {
    selector: appLabels,
    ports: [{ port: 5432, targetPort: 5432, nodePort: 31000, name: 'postgres' }],
    type: 'NodePort'
  }
})
