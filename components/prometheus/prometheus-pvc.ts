import * as k8s from "@pulumi/kubernetes";
import { provider } from "../azure/aks-deployment"
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'prometheus' };
const config = loadConfig()

export const prometheusPVC = new k8s.core.v1.PersistentVolumeClaim("jobsbolt-prometheus-pvc", {
  metadata: {
    name: "jobsbolt-prometheus-pvc",
    labels: appLabels,
  },
  spec: {
    accessModes: ["ReadWriteOnce"],
    storageClassName: "prometheus-azure-disk", // Use the disk storage class
    resources: {
      requests: {
        storage: config.env.PROMETHEUS_PVC_STORAGE,
      },
    },
  },
}, { provider: provider })
