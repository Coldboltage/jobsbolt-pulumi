import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'postgres' };
const config = loadConfig()


export const postgresDeployment = new k8s.apps.v1.Deployment('jobsbolt-postgres-deployment', {
  metadata: {
    name: 'jobsbolt-postgres-deployment',
    labels: appLabels,
  },
  spec: {
    replicas: +config.env.POSTGRES_DEPLOYMENT_REPLICA,
    selector: {
      matchLabels: appLabels
    },
    template: {
      metadata: {
        labels: appLabels,
      },
      spec: {
        volumes: [
          { name: 'jobsbolt-postgres-volume', persistentVolumeClaim: { claimName: 'jobsbolt-postgres-pvc' } },
        ],
        containers: [{
          image: "postgres:13",
          name: "jobsbolt-postgres",
          volumeMounts: [{ name: 'jobsbolt-postgres-volume', mountPath: '/var/lib/postgresql/' }],
          ports: [{ containerPort: 5432, name: 'postgres' }],
          resources: {
            requests: { cpu: config.env.POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_CPU, memory: config.env.POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY }, // Increase the minimum guaranteed resources
            limits: { cpu: config.env.POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_CPU, memory: config.env.POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_MEMORY },    // Allow the pod to use more resources if needed
          },
          env: [
            {
              name: 'PGDATA', // Set PGDATA to use a subdirectory for the PostgreSQL data
              value: '/var/lib/postgresql/data/'
            },
            {
              name: 'POSTGRES_USER', valueFrom: {
                configMapKeyRef: {
                  name: 'jobsbolt-postgres-config',
                  key: 'TYPEORM_USERNAME',
                },
              }
            },
            {
              name: 'POSTGRES_PASSWORD', valueFrom: {
                secretKeyRef: {
                  name: 'jobsbolt-postgres-secret',
                  key: 'TYPEORM_PASSWORD',
                },
              }
            },
            {
              name: 'POSTGRES_DB', valueFrom: {
                configMapKeyRef: {
                  name: 'jobsbolt-postgres-config',
                  key: 'TYPEORM_DATABASE',
                }
              }
            },
          ],
        }]
      },
    }
  }
}, { provider: provider })


