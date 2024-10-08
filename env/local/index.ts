import { rabbitmqDeployment } from "./rabbitmq/rabbitmq-deployment";
import { rabbitmqService } from "./rabbitmq/rabbitmq-service";
import { rabbitmqConfigMap } from "./rabbitmq/rabbitmq-config";
import { postgresDeployment } from "./postgres/postgres-deployment";
import { postgresService } from "./postgres/postgres-service";
import { postgresConfigMap } from "./postgres/postgres-config";
import { postgresPVC } from "./postgres/postgres-pvc";
import { postgresSecret } from "./postgres/postgres-secret";
import { postgresPV } from "./postgres/postgres-pv";
import { prometheusDeployment } from "./prometheus/prometheus-deployment";
import { prometheusService } from "./prometheus/prometheus-service";
import { prometheusConfigMap } from "./prometheus/prometheus-config";
import { prometheusPV } from "./prometheus/prometheus-pv";
import { prometheusPVC } from "./prometheus/prometheus-pvc";
import { apiDeployment } from "./api/api-deployment";
import { apiConfigMap } from "./api/api-config";
import { apiService } from "./api/api-service";
import { apiSecret } from "./api/api-secret";
import { grafanaDeployment } from "./grafana/grafana-deployment";
import { grafanaService } from "./grafana/grafana-service";
import { grafanaPvc } from "./grafana/grafana-pvc";
import { grafanaVolume } from "./grafana/grafana-volume";


// RabitMQ resources
export const rabbitmqDeploymentName = rabbitmqDeployment.metadata.name;
export const rabbitmqServiceName = rabbitmqService.metadata.name;
export const rabbitmqConfigMapName = rabbitmqConfigMap.metadata.name;

// Postgres resources
export const postgresDeploymentName = postgresDeployment.metadata.name;
export const postgresServiceName = postgresService.metadata.name;
export const postgresConfigMapName = postgresConfigMap.metadata.name;
export const postgresPVCName = postgresPVC.metadata.name;
export const postgresSecretName = postgresSecret.metadata.name;
export const postgresPVName = postgresPV.metadata.name;

// Prometheus resources
export const prometheusDeploymentName = prometheusDeployment.metadata.name;
export const prometheusServiceName = prometheusService.metadata.name;
export const prometheusConfigMapName = prometheusConfigMap.metadata.name;
export const prometheusPVName = prometheusPV.metadata.name;
export const prometheusPVCName = prometheusPVC.metadata.name;

// API resources
export const apiDeploymentName = apiDeployment.metadata.name;
export const apiServiceName = apiService.metadata.name;
export const apiConfigMapName = apiConfigMap.metadata.name;
export const apiSecretName = apiSecret.metadata.name

// Grafana resources
export const grafanaDeploymentName = grafanaDeployment.metadata.name;
export const grafanaServiceName = grafanaService.metadata.name;
export const grafanaPVCName = grafanaPvc.metadata.name;
export const grafanaVolumeName = grafanaVolume.metadata.name;


