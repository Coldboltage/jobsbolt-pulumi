import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";

// Load the validated config
const postgresConfig = loadConfig().api
const appLabels = { app: 'jobsbolt', component: 'prometheus' };


export const prometheusConfigMap = new k8s.core.v1.ConfigMap("jobsbolt-prometheus-config-map", {
  metadata: {
    name: "jobsbolt-prometheus-config",
    labels: appLabels,
  },
  data: {
    "prometheus.yml": `
        global:
          scrape_interval: 5s
          evaluation_interval: 5s

        scrape_configs:
          - job_name: 'api'
            static_configs:
              - targets: ['jobsbolt-api-service:3000']
      `,
  },
})

