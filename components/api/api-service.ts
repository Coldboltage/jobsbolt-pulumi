import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"


const appLabels = { app: 'jobsbolt', component: 'api' };

export const apiService = new k8s.core.v1.Service('jobsbolt-api-service', {
  metadata: {
    name: 'jobsbolt-api-service',
    labels: appLabels,
  },
  spec: {
    selector: appLabels,
    ports: [{ port: 3000, targetPort: 3000, name: 'http' }, { port: 9090, targetPort: 9090, name: 'metrics' }   // Exposing metrics on port 9090
    ],
    type: 'LoadBalancer',
  }
}, { provider: provider })

