import * as k8s from "@pulumi/kubernetes";
import { provider } from "../eks/eks-deployment";

const appLabels = { app: 'jobsbolt', component: 'postgres' };

export const postgresPV = new k8s.core.v1.PersistentVolume("jobsbolt-postgres-pv", {
  metadata: {
    name: "jobsbolt-postgres-pv",
    labels: appLabels,
  },
  spec: {
    capacity: {
      storage: "2Gi",
    },
    accessModes: ["ReadWriteOnce"],
    persistentVolumeReclaimPolicy: "Retain",
    hostPath: { path: "\mnt\C:\Users\aland\Documents\projects\jobsbolt\jobsbolt-pulumi\local\postgres-data" },
  },
}, { provider: provider })

