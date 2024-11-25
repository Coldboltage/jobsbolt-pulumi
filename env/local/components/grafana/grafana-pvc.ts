import * as k8s from "@pulumi/kubernetes";

const appLabels = { app: 'jobsbolt', component: 'grafana' };


export const grafanaPvc = new k8s.core.v1.PersistentVolumeClaim('jobsbolt-grafana-pvc', {
  metadata: {
    name: 'jobsbolt-grafana-pvc',
    labels: appLabels,
  },
  spec: {
    accessModes: ['ReadWriteOnce'],
    resources: {
      requests: {
        storage: '2Gi'
      }
    }
  }
})
