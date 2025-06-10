import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'prometheus' };
const config = loadConfig()


export const prometheusPVC = new k8s.core.v1.PersistentVolumeClaim("prometheus-pvc", {
  metadata: { name: "jobsbolt-prometheus-pvc" },
  spec: {
    accessModes: ["ReadWriteOnce"],
    resources: {
      requests: {
        storage: config.env.PROMETHEUS_PVC_STORAGE
      },
    },
  },
}, { provider: provider })

