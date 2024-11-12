import * as k8s from "@pulumi/kubernetes";
import { provider } from "../azure/aks-deployment"

const appLabels = { app: 'jobsbolt', component: 'rabbitmq' };

export const rabbitmqService = new k8s.core.v1.Service('jobsbolt-rabbitmq-service', {
  metadata: {
    name: 'jobsbolt-rabbitmq-service',
    labels: appLabels,
  },
  spec: {
    selector: appLabels,
    ports: [
      { port: 5672, targetPort: 5672, name: 'amqp' },
      { port: 15672, targetPort: 15672, name: 'http' },
    ],
    type: 'ClusterIP',
  },
}, { provider: provider });

