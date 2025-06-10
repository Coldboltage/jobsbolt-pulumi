import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'prometheus' };
const config = loadConfig()


export const prometheusDeployment = new k8s.apps.v1.Deployment('jobsbolt-prometheus-deployment', {
  metadata: {
    name: 'jobsbolt-prometheus-deployment',
    labels: appLabels,
  },
  spec: {
    replicas: +config.env.PROMETHEUS_DEPLOYMENT_REPLICAS,
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
            requests: { cpu: config.env.PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_CPU, memory: config.env.PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY },
            limits: { cpu: config.env.PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_CPU, memory: config.env.PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_MEMORY },
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


