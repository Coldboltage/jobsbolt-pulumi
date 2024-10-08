import * as k8s from "@pulumi/kubernetes";
import { Input, Resource } from "@pulumi/pulumi";

const appLabels = { app: 'jobsbolt', component: 'grafana' };

export const createGrafanaDeployment = (...dependsOn: Input<Resource>[]) => {
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
          volumes: [{
            name: 'jobsbolt-grafana-volume',
            persistentVolumeClaim: { claimName: 'jobsbolt-grafana-pvc' }
          }],
          containers: [{
            image: "grafana/grafana",
            name: "jobsbolt-grafana",
            volumeMounts: [{
              name: 'jobsbolt-grafana-volume',
              mountPath: '/var/lib/grafana'
            }],
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