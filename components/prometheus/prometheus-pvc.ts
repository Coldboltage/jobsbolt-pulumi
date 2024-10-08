import * as k8s from "@pulumi/kubernetes";
import { provider } from "../eks/eks-deployment";

const appLabels = { app: 'jobsbolt', component: 'prometheus' };


export const prometheusPVC = new k8s.core.v1.PersistentVolumeClaim("jobsbolt-prometheus-pvc", {
  metadata: {
    name: "jobsbolt-prometheus-pvc",
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
}, { provider: provider })
