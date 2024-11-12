import * as k8s from "@pulumi/kubernetes";
import { provider } from "../azure/aks-deployment"

export const postgresStorageClass = new k8s.storage.v1.StorageClass("prometheus-azure-disk", {
  metadata: { name: "prometheus-azure-disk" },
  provisioner: "kubernetes.io/azure-disk",
  parameters: {
    storageaccounttype: "Standard_LRS",  // Storage type
    kind: "Managed",  // Managed Disk
  },
}, { provider: provider });