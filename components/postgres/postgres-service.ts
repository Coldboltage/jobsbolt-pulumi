import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";
import { provider } from "../provider/provider"

const appLabels = { app: 'jobsbolt', component: 'postgres' };


export const postgresService = new k8s.core.v1.Service('jobsbolt-postgres-service', {
  metadata: {
    name: 'jobsbolt-postgres-service',
    labels: appLabels
  },
  spec: {
    selector: appLabels,
    ports: [{ port: 5432, targetPort: 5432, name: 'postgres' }],
    type: 'LoadBalancer'
  }
}, { provider: provider })

