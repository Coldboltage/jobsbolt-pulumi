import * as k8s from "@pulumi/kubernetes";
import { provider } from "../provider/provider"

export const prometheusStorageClass = new k8s.storage.v1.StorageClass("azure-disk", {
  metadata: { name: "prometheus-azure-disk" },
  provisioner: "kubernetes.io/azure-disk",
  parameters: {
    storageaccounttype: "Standard_LRS",  // Storage type
    kind: "Managed",  // Managed Disk
  },
}, { provider: provider });