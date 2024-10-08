import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: 'jobsbolt', component: 'api' };

export const apiService = () => {
  return new k8s.core.v1.Service('jobsbolt-api-service', {
    metadata: {
      name: 'jobsbolt-api-service',
      labels: appLabels,
    },
    spec: {
      selector: appLabels,
      ports: [{ port: 3000, targetPort: 3000, nodePort: 30000, name: 'http' }],
      type: 'NodePort',
    }
  })
}