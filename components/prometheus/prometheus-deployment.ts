import * as k8s from "@pulumi/kubernetes";
import { provider } from "../eks/eks-deployment";

const appLabels = { app: 'jobsbolt', component: 'prometheus' };


export const prometheusDeployment = new k8s.apps.v1.Deployment('jobsbolt-prometheus-deployment', {
  metadata: {
    name: 'jobsbolt-prometheus-deployment',
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
          image: "prom/prometheus:v2.36.2",
          name: "jobsbolt-prometheus",
          ports: [{ containerPort: 9090, name: 'prometheus' }],
          resources: {
            requests: { cpu: '100m', memory: '100Mi' },
            limits: { cpu: '500m', memory: '500Mi' },
          },
          volumeMounts: [{
            name: 'config-volume',
            mountPath: '/etc/prometheus',
          }],
        }],
        volumes: [{
          name: 'config-volume',
          configMap: {
            name: 'jobsbolt-prometheus-config',
          },
        }]
      },
    }
  }
}, { provider: provider })


