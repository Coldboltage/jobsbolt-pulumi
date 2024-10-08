import * as k8s from "@pulumi/kubernetes";
import { provider } from "../eks/eks-deployment";

const appLabels = { app: 'jobsbolt', component: 'prometheus' };


export const prometheusService = new k8s.core.v1.Service('jobsbolt-prometheus-service', {
  metadata: {
    name: 'jobsbolt-prometheus-service',
    labels: appLabels
  },
  spec: {
    selector: appLabels,
    ports: [{ port: 9090, targetPort: 9090, nodePort: 32000, name: 'prometheus' }],
    type: 'NodePort'
  }
}, { provider: provider })
