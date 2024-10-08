import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: 'jobsbolt', component: 'prometheus' };

export const prometheusPV = () => {
  return new k8s.core.v1.PersistentVolume("jobsbolt-prometheus-pv", {
    metadata: {
      name: "jobsbolt-prometheus-pv",
      labels: appLabels,
    },
    spec: {
      capacity: {
        storage: "2Gi",
      },
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      hostPath: { path: "\mnt\C:\Users\aland\Documents\projects\jobsbolt\jobsbolt-pulumi\local\prometheus-data" },
    },
  })
}