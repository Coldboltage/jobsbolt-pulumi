import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: 'jobsbolt', component: 'postgres' };


export const postgresDeployment = new k8s.apps.v1.Deployment('jobsbolt-postgres-deployment', {
  metadata: {
    name: 'jobsbolt-postgres-deployment',
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
        volumes: [
          { name: 'jobsbolt-postgres-volume', persistentVolumeClaim: { claimName: 'jobsbolt-postgres-pvc' } },
        ],
        containers: [{
          image: "postgres:13",
          name: "jobsbolt-postgres",
          volumeMounts: [{ name: 'jobsbolt-postgres-volume', mountPath: '/var/lib/postgresql/data' }],
          ports: [{ containerPort: 5432, name: 'postgres' }],
          resources: {
            requests: { cpu: '100m', memory: '100Mi' },
            limits: { cpu: '500m', memory: '500Mi' },
          },
          env: [
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
})

