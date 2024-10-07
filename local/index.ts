import { rabbitmqModule } from "./rabbitmq/rabbitmq-module";
import { apiModule } from "./api/api-module";
import { postgresModule } from "./postgres/postgres-module";
import { prometheusModule } from "./prometheus/prometheus-module";


const rabbitmqResources = rabbitmqModule();
const postgresResources = postgresModule();
const prometheusResources = prometheusModule();

// RabitMQ resources
export const rabbitmqDeploymentName = rabbitmqResources.deployment.metadata.name;
export const rabbitmqServiceName = rabbitmqResources.service.metadata.name;
export const rabbitmqConfigMapName = rabbitmqResources.configMap.metadata.name;

// Postgres resources
export const postgresDeploymentName = postgresResources.deployment.metadata.name;
export const postgresServiceName = postgresResources.service.metadata.name;
export const postgresConfigMapName = postgresResources.configMap.metadata.name;
export const postgresPVCName = postgresResources.pvc.metadata.name;
export const postgresSecretName = postgresResources.secret.metadata.name;
export const postgresPVName = postgresResources.pv.metadata.name;

// Prometheus resources
export const prometheusDeploymentName = prometheusResources.deployment.metadata.name;
export const prometheusServiceName = prometheusResources.service.metadata.name;
export const prometheusConfigMapName = prometheusResources.configMap.metadata.name;
export const prometheusPVCName = prometheusResources.pvc.metadata.name;

const apiResources = apiModule(rabbitmqResources.deployment, postgresResources.deployment, prometheusResources.deployment);

// API resources
export const apiDeploymentName = apiResources.deployment.metadata.name;
export const apiServiceName = apiResources.service.metadata.name;
export const apiConfigMapName = apiResources.configMap.metadata.name;


