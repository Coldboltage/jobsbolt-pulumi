import * as pulumi from "@pulumi/pulumi";


import { rabbitmqDeployment } from "../../components/rabbitmq/rabbitmq-deployment";
import { rabbitmqService } from "../../components/rabbitmq/rabbitmq-service";
import { rabbitmqConfigMap } from "../../components/rabbitmq/rabbitmq-config";
import { postgresDeployment } from "../../components/postgres/postgres-deployment";
import { postgresService } from "../../components/postgres/postgres-service";
import { postgresConfigMap } from "../../components/postgres/postgres-config";
import { postgresPVC } from "../../components/postgres/postgres-pvc";
import { postgresSecret } from "../../components/postgres/postgres-secret";
import { postgresStorageClass } from "../../components/postgres/postgres-storageClass";
import { prometheusDeployment } from "../../components/prometheus/prometheus-deployment";
import { prometheusService } from "../../components/prometheus/prometheus-service";
import { prometheusConfigMap } from "../../components/prometheus/prometheus-config";
import { prometheusPVC } from "../../components/prometheus/prometheus-pvc";
import { prometheusStorageClass } from "../../components/prometheus/prometheus-storageClass";
import { apiConfigMap } from "../../components/api/api-config";
import { apiService } from "../../components/api/api-service";
import { apiSecret } from "../../components/api/api-secret";
import { apiDeployment } from "../../components/api/api-deployment";
// import { grafanaService } from "../../components/grafana/grafana-service";
// import { grafanaPvc } from "../../components/grafana/grafana-pvc";
// import { grafanaVolume } from "../../components/grafana/grafana-volume";
// import { grafanaDeployment } from "../local/grafana/grafana-deployment";

import { provider, kubeconfig, clusterName, networkName, rgName, managedDiskName } from "../../components/azure/aks-deployment";

// Azure resources
export const resourceGroupName = rgName;          // Exports the resource group name
export const vNetName = networkName;              // Exports the virtual network name
export const kubernetesClusterName = clusterName; // Exports the AKS cluster name
export const kubeConfigOutput = pulumi.secret(kubeconfig);       // Exports kubeconfig if needed (secured)
export const k8sAdminProvider = provider;         // Exports the Kubernetes provider for other components to use
export const azureManagedDiskName = managedDiskName


// // RabitMQ resources
export const rabbitmqDeploymentName = rabbitmqDeployment.metadata.name;
export const rabbitmqServiceName = rabbitmqService.metadata.name;
export const rabbitmqConfigMapName = rabbitmqConfigMap.metadata.name;

// // Postgres resources
export const postgresDeploymentName = postgresDeployment.metadata.name;
export const postgresServiceName = postgresService.metadata.name;
export const postgresConfigMapName = postgresConfigMap.metadata.name;
export const postgresPVCName = postgresPVC.metadata.name;
export const postgresSecretName = postgresSecret.metadata.name;
export const postgresStorageClassName = postgresStorageClass.metadata.name;

// // Prometheus resources
export const prometheusDeploymentName = prometheusDeployment.metadata.name;
export const prometheusServiceName = prometheusService.metadata.name;
export const prometheusConfigMapName = prometheusConfigMap.metadata.name;
export const prometheusStorageClassName = prometheusStorageClass.metadata.name;
export const prometheusPVCName = prometheusPVC.metadata.name;

// // API resources
export const apiDeploymentName = apiDeployment.metadata.name;
export const apiServiceName = apiService.metadata.name;
export const apiConfigMapName = apiConfigMap.metadata.name;
export const apiSecretName = apiSecret.metadata.name

// // Grafana resources
// export const grafanaDeploymentName = grafanaDeployment.metadata.name;
// export const grafanaServiceName = grafanaService.metadata.name;
// export const grafanaPVCName = grafanaPvc.metadata.name;
// export const grafanaVolumeName = grafanaVolume.metadata.name;