import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"
import { loadConfig } from "../config/config";

const appLabels = { app: 'jobsbolt', component: 'postgres' };
const config = loadConfig()


export const postgresPVC = new k8s.core.v1.PersistentVolumeClaim("jobsbolt-postgres-pvc", {
  metadata: { name: "jobsbolt-postgres-pvc" },
  spec: {
    accessModes: ["ReadWriteOnce"],
    resources: {
      requests: {
        storage: config.env.POSTGRES_PVC_STORAGE
      },
    },
  },
}, { provider: provider })

