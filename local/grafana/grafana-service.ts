import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: 'jobsbolt', component: 'grafana' };

export const grafanaService = () => {
  return new k8s.core.v1.Service('jobsbolt-grafana-service', {
    metadata: {
      name: 'jobsbolt-grafana-service',
      labels: appLabels,
    },
    spec: {
      selector: appLabels,
      ports: [
        { port: 3000, targetPort: 3001, nodePort: 30001, name: 'grafana' }
      ],
      type: 'NodePort',
    },
  })
}