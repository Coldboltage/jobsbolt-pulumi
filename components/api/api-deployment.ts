import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"
import { loadConfig } from "../config/config";
import { postgresDeployment } from "../postgres/postgres-deployment";
import { apiConfigMap } from "./api-config";
import { apiSecret } from "./api-secret";

const config = loadConfig();

const appLabels = { app: 'jobsbolt', component: 'api' };

export const apiDeployment = new k8s.apps.v1.Deployment('jobsbolt-api-deployment', {
  metadata: {
    name: "jobsbolt-api-deployment",
    namespace: "default",
    labels: appLabels,
  },
  spec: {
    replicas: +config.env.API_DEPLOYMENT_REPLICAS,
    selector: { matchLabels: appLabels },
    template: {
      metadata: { labels: appLabels },
      spec: {
        containers: [{
          image: config.env.API_DEPLOYMENT_CONTAINER_IMAGE,
          name: "jobsbolt-api",
          imagePullPolicy: "Always",
          ports: [{ containerPort: 3000 }],
          resources: {
            requests: { cpu: config.env.API_DEPLOYMENT_RESOURCES_REQUESTS_CPU, memory: config.env.API_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY },
            limits: { cpu: config.env.API_DEPLOYMENT_RESOURCES_LIMITS_CPU, memory: config.env.API_DEPLOYMENT_RESOURCES_LIMITS_MEMORY },
          },
          readinessProbe: {
            exec: {
              command: ["sh", "-c", "echo 'Waiting for container'"] // Simple command, can be adjusted
            },
            initialDelaySeconds: 60, // Waits 30 seconds before probing readiness
            periodSeconds: 5,        // Checks every 5 seconds
            failureThreshold: 3,     // Number of failed attempts before failing the pod
          },
          // env: [
          //   {
          //     name: 'RABBITMQ_URL', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'RABBITMQ_URL',
          //       }
          //     }
          //   },
          //   {
          //     name: 'RABBITMQ_USERNAME', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'RABBITMQ_USERNAME',
          //       }
          //     }
          //   },
          //   {
          //     name: 'RABBITMQ_PASSWORD', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'RABBITMQ_PASSWORD',
          //       }
          //     },
          //   },
          //   {
          //     name: 'TYPEORM_HOST', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'TYPEORM_HOST',
          //       }
          //     }
          //   },
          //   {
          //     name: 'TYPEORM_TYPE', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'TYPEORM_TYPE',
          //       }
          //     }
          //   },
          //   {
          //     name: 'TYPEORM_PORT', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'TYPEORM_PORT',
          //       }
          //     }
          //   },
          //   {
          //     name: 'TYPEORM_USERNAME', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'TYPEORM_USERNAME',
          //       }
          //     }
          //   },
          //   {
          //     name: 'TYPEORM_PASSWORD', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'TYPEORM_PASSWORD',
          //       }
          //     }
          //   },
          //   {
          //     name: 'TYPEORM_DATABASE', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'TYPEORM_DATABASE',
          //       }
          //     }
          //   },
          //   {
          //     name: 'SEEDER_NAME', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'SEEDER_NAME',
          //       }
          //     }
          //   },
          //   {
          //     name: 'SEEDER_EMAIL', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'SEEDER_EMAIL',
          //       }
          //     }
          //   },
          //   {
          //     name: 'SEEDER_PASSWORD', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'SEEDER_PASSWORD',
          //       }
          //     }
          //   },
          //   {
          //     name: 'GENERAL_TEST', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'GENERAL_TEST',
          //       }
          //     }
          //   },
          //   {
          //     name: 'FIND_JOB', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'FIND_JOB',
          //       }
          //     }
          //   },
          //   {
          //     name: 'TEST_BATCH', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'TEST_BATCH',
          //       }
          //     }
          //   },
          //   {
          //     name: 'DISCORD_TEST', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'DISCORD_TEST',
          //       }
          //     }
          //   },
          //   {
          //     name: 'FULL_TEST', valueFrom: {
          //       configMapKeyRef: {
          //         name: 'jobsbolt-api-config',
          //         key: 'FULL_TEST',
          //       }
          //     }
          //   },
          //   {
          //     name: 'JWT_SECRET', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'JWT_SECRET',
          //       }
          //     }
          //   },
          //   {
          //     name: 'OPENAI_API_KEY', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'OPENAI_API_KEY',
          //       }
          //     }
          //   },
          //   {
          //     name: 'DISCORD_KEY', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'DISCORD_KEY',
          //       }
          //     }
          //   },
          //   {
          //     name: 'SENTRY_DSN', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'SENTRY_DSN',
          //       }
          //     }
          //   },
          //   {
          //     name: 'SENTRY_AUTH_TOKEN', valueFrom: {
          //       secretKeyRef: {
          //         name: 'jobsbolt-api-secret',
          //         key: 'SENTRY_AUTH_TOKEN',
          //       }
          //     }
          //   },
          // ]
          envFrom: [
            { configMapRef: { name: apiConfigMap.metadata.name } },
            { secretRef: { name: apiSecret.metadata.name } },
          ],
        }],
      },
    },
  },
}, { provider: provider })

