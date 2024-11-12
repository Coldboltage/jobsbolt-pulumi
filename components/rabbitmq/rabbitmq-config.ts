import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";
import { provider } from "../azure/aks-deployment"

// Load the validated config
const rabbitmqConfig = loadConfig().rabbitmq


export const rabbitmqConfigMap = new k8s.core.v1.ConfigMap("jobsbolt-rabbitmq-config-map", {
  metadata: {
    name: "jobsbolt-rabbitmq-config-map",
  },
  data: {
    "rabbitmq.conf": `
      loopback_users.guest = false
      listeners.tcp.default = 5672
      management.tcp.port = 15672
      `,
    replicas: rabbitmqConfig.RABBITMQ_REPLICA,
  },
}, { provider: provider });


