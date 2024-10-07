import * as k8s from "@pulumi/kubernetes";
import { Input, Resource } from "@pulumi/pulumi";

const appLabels = { app: 'jobsbolt', component: 'grafana' };

export const grafanaDeployment = (...dependsOn: Input<Resource>[]) => {
  return new k8s.apps.v1.Deployment('jobsbolt-grafana-deployment', {
    metadata: {
      name: 'jobsbolt-grafana-deployment',
      labels: appLabels,
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: appLabels
      },
      template: {
        metadata: {
          labels: appLabels,
        },
        spec: {
          containers: [{
            image: "grafana/grafana:latest",
            name: "jobsbolt-grafana",
            ports: [{ containerPort: 3000, name: 'grafana' }],
            resources: {
              requests: { cpu: '100m', memory: '100Mi' },
              limits: { cpu: '500m', memory: '500Mi' },
            },
          }]
        },
      }
    },
  }, { dependsOn: [...dependsOn] });
}