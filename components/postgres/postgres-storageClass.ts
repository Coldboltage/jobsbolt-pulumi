import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"

const appLabels = { app: 'jobsbolt', component: 'postgres' };


export const postgresStorageClass = new k8s.storage.v1.StorageClass("jobsbolt-postgres-storage-class", {
  metadata: { name: "jobsbolt-postgres-storage-class", labels: appLabels },
  provisioner: "ebs.csi.aws.com",
  parameters: {
    type: "gp3",
    fsType: "ext4",
  },
  reclaimPolicy: "Retain",
  volumeBindingMode: "WaitForFirstConsumer",
}, { provider: provider });