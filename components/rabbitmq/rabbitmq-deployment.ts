import * as k8s from "@pulumi/kubernetes";
import { loadConfig } from "../config/config";


const appLabels = { app: 'jobsbolt', component: 'rabbitmq' };
const rabbitmqConfig = loadConfig().rabbitmq;

export const rabbitmqDeployment = new k8s.apps.v1.Deployment('jobsbolt-rabbitmq-deployment', {
  metadata: {
    name: "jobsbolt-rabbitmq-deployment",
    namespace: "default",  // Kubernetes namespace where the deployment will be created
    labels: appLabels,     // Labels to identify the deployment
    annotations: {
      "app.kubernetes.io/managed-by": "pulumi",  // Annotation to indicate management by Pulumi
    },
  },
  spec: {
    replicas: +rabbitmqConfig.RABBITMQ_REPLICA,
    selector: {
      matchLabels: appLabels
    },
    template: {
      metadata: {
        labels: appLabels,
      },
      spec: {
        containers: [{
          image: "rabbitmq:3-management",
          name: "jobsbolt-rabbitmq",
          ports: [
            { containerPort: 5672, name: 'amqp' },
            { containerPort: 15672, name: 'http' },
          ],
          resources: {
            requests: { cpu: '100m', memory: '100Mi' },
            limits: { cpu: '500m', memory: '500Mi' },
          },
        }],
      },
    },
  },
})

