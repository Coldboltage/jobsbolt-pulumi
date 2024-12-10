import { rabbitmqDeployment } from "../components/rabbitmq/rabbitmq-deployment";
import { rabbitmqService } from "../components/rabbitmq/rabbitmq-service";
import { rabbitmqConfigMap } from "../components/rabbitmq/rabbitmq-config";
import { postgresDeployment } from "../components/postgres/postgres-deployment";
import { postgresService } from "../components/postgres/postgres-service";
import { postgresConfigMap } from "../components/postgres/postgres-config";
import { postgresPVC } from "../components/postgres/postgres-pvc";
import { postgresSecret } from "../components/postgres/postgres-secret";
import { postgresPV } from "../components/postgres/postgres-pv";
import { prometheusDeployment } from "../components/prometheus/prometheus-deployment";
import { prometheusService } from "../components/prometheus/prometheus-service";
import { prometheusConfigMap } from "../components/prometheus/prometheus-config";
import { prometheusPV } from "../components/prometheus/prometheus-pv";
import { prometheusPVC } from "../components/prometheus/prometheus-pvc";
import { apiDeployment } from "../components/api/api-deployment";
import { apiConfigMap } from "../components/api/api-config";
import { apiService } from "../components/api/api-service";
import { apiSecret } from "../components/api/api-secret";
import { grafanaDeployment } from "../components/grafana/grafana-deployment";
import { grafanaService } from "../components/grafana/grafana-service";
import { grafanaPvc } from "../components/grafana/grafana-pvc";
import { grafanaVolume } from "../components/grafana/grafana-volume";
import { workerDeployment } from "../components/worker/worker-deployment"
import { workerSecret } from "../components/worker/worker-secret"

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

// Worker resources
export const workerDeploymentName = workerDeployment.metadata.name
export const workerSecretName = workerSecret.metadata.name


