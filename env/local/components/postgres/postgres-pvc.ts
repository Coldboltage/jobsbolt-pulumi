import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: 'jobsbolt', component: 'postgres' };


export const postgresPVC = new k8s.core.v1.PersistentVolumeClaim("jobsbolt-postgres-pvc", {
  metadata: {
    name: "jobsbolt-postgres-pvc",
    labels: appLabels,
  },
  spec: {
    accessModes: ["ReadWriteOnce"],
    resources: {
      requests: {
        storage: "2Gi",
      },
    },
  },
})
