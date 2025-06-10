import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"

export const grafanaPV = new k8s.core.v1.PersistentVolume("grafana-pv", {
  metadata: {
    name: "jobsbolt-grafana-pv",
  },
  spec: {
    capacity: {
      storage: "5Gi",
    },
    accessModes: ["ReadWriteOnce"],
    persistentVolumeReclaimPolicy: "Retain",
    hostPath: {
      path: "/tmp/jobsbolt-grafana-pv",
      type: "DirectoryOrCreate",
    },
  },
}, { provider });