import * as k8s from "@pulumi/kubernetes";
import { provider } from "../azure/aks-deployment"
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'grafana' };
const config = loadConfig()


export const grafanaPVC = new k8s.core.v1.PersistentVolumeClaim("grafana-pvc", {
  metadata: { name: "jobsbolt-grafana-pvc" },
  spec: {
    accessModes: ["ReadWriteOnce"],
    storageClassName: "grafana-azure-disk", // Use the disk storage class
    resources: {
      requests: {
        storage: config.env.GRAFANA_PVC_STORAGE, // Size of the disk
      },
    },
  },
}, { provider: provider })

