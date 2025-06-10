import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"

export const prometheusPV = new k8s.core.v1.PersistentVolume("prometheus-pv", {
  metadata: {
    name: "jobsbolt-prometheus-pv",
  },
  spec: {
    capacity: {
      storage: "5Gi",
    },
    accessModes: ["ReadWriteOnce"],
    persistentVolumeReclaimPolicy: "Retain",
    hostPath: {
      path: "/tmp/jobsbolt-prometheus-pv",
      type: "DirectoryOrCreate",
    },
  },
}, { provider });