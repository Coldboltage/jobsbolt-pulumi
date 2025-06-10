import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'grafana' };
const config = loadConfig()

export const grafanaDeployment = new k8s.apps.v1.Deployment('jobsbolt-grafana-deployment', {
  metadata: {
    name: 'jobsbolt-grafana-deployment',
    labels: appLabels,
  },
  spec: {
    replicas: +config.env.GRAFANA_DEPLOYMENT_REPLICAS,
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
            requests: { cpu: config.env.GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_CPU, memory: config.env.GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY },
            limits: { cpu: config.env.GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_CPU, memory: config.env.GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_MEMORY },
          },
        }]
      },
    }
  },
}, { provider: provider })

