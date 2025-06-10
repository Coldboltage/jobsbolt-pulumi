import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"

export const postgresPV = new k8s.core.v1.PersistentVolume("jobsbolt-postgres-pv", {
  metadata: {
    name: "jobsbolt-postgres-pv",
  },
  spec: {
    capacity: {
      storage: "5Gi",
    },
    accessModes: ["ReadWriteOnce"],
    persistentVolumeReclaimPolicy: "Retain",
    hostPath: {
      path: "/tmp/jobsbolt-postgres-pv",
      type: "DirectoryOrCreate",
    },
  },
}, { provider });