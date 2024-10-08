import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: 'jobsbolt', component: 'grafana' };


export const grafanaVolume = new k8s.core.v1.PersistentVolume('jobsbolt-grafana-volume', {
  metadata: {
    name: 'jobsbolt-grafana-volume',
    labels: appLabels,
  },
  spec: {
    capacity: {
      storage: '2Gi'
    },
    accessModes: ['ReadWriteOnce'],
    hostPath: {
      path: "\mnt\C:\Users\aland\Documents\projects\jobsbolt\jobsbolt-pulumi\local\grafana-data"
    }
  }
})
