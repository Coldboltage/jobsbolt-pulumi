import * as k8s from "@pulumi/kubernetes";
import { provider } from "../eks/eks-deployment";

const appLabels = { app: 'jobsbolt', component: 'grafana' };


export const grafanaService = new k8s.core.v1.Service('jobsbolt-grafana-service', {
  metadata: {
    name: 'jobsbolt-grafana-service',
    labels: appLabels,
  },
  spec: {
    selector: appLabels,
    ports: [
      { port: 300, targetPort: 3000, nodePort: 30001, name: 'grafana' }
    ],
    type: 'NodePort',
  },
}, { provider: provider })

