import { z } from "zod";

// API Deployment Schema
export const envSchema = z.object({
  // Azure Resource Manager Configuration
  KUBERNETES_VERSION: z.string().min(1, "KUBERNETES_VERSION is required"),
  NODE_VM_SIZE: z.string().min(1, "NODE_VM_SIZE is required"),
  NUM_WORKER_NODES: z.number().min(1, "NUM_WORKER_NODES is required"),
  PREFIX_FOR_DNS: z.string().min(1, "PREFIX_FOR_DNS is required"),
  MGMT_GROUP_ID: z.string().min(1, "MGMT_GROUP_ID is required"),
  SSH_PUB_KEY: z.string().min(1, "SSH_PUB_KEY is required"),

  // API Deployment Schema
  API_DEPLOYMENT_REPLICAS: z.number().min(1, "API_DEPLOYMENT_REPLICAS is required"),
  API_DEPLOYMENT_CONTAINER_IMAGE: z.string().min(1, "API_DEPLOYMENT_CONTAINER_IMAGE is required"),
  API_DEPLOYMENT_RESOURCES_REQUESTS_CPU: z.string().min(1, "API_DEPLOYMENT_RESOURCES_REQUESTS_CPU is required"),
  API_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: z.string().min(1, "API_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY is required"),
  API_DEPLOYMENT_RESOURCES_LIMITS_CPU: z.string().min(1, "API_DEPLOYMENT_RESOURCES_LIMITS_CPU is required"),
  API_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: z.string().min(1, "API_DEPLOYMENT_RESOURCES_LIMITS_MEMORY is required"),

  // Grafana Deployment Schema
  GRAFANA_DEPLOYMENT_REPLICAS: z.number().min(1, "GRAFANA_DEPLOYMENT_REPLICAS is required"),
  GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_CPU: z.string().min(1, "GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_CPU is required"),
  GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: z.string().min(1, "GRAFANA_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY is required"),
  GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_CPU: z.string().min(1, "GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_CPU is required"),
  GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: z.string().min(1, "GRAFANA_DEPLOYMENT_RESOURCES_LIMITS_MEMORY is required"),
  GRAFANA_PVC_STORAGE: z.string().min(1, "GRAFANA_PVC_STORAGE is required"),

  // Postgres Deployment Schema
  POSTGRES_DEPLOYMENT_REPLICA: z.number().min(1, "POSTGRES_DEPLOYMENT_REPLICA is required"),
  POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_CPU: z.string().min(1, "POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_CPU is required"),
  POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: z.string().min(1, "POSTGRES_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY is required"),
  POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_CPU: z.string().min(1, "POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_CPU is required"),
  POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: z.string().min(1, "POSTGRES_DEPLOYMENT_RESOURCES_LIMITS_MEMORY is required"),
  POSTGRES_PVC_STORAGE: z.string().min(1, "POSTGRES_PVC_STORAGE is required"),

  // Prometheus Deployment Schema
  PROMETHEUS_DEPLOYMENT_REPLICAS: z.number().min(1, "PROMETHEUS_DEPLOYMENT_REPLICAS is required"),
  PROMETHEUS_DEPLOYMENT_CONTAINER_IMAGE: z.string().min(1, "PROMETHEUS_DEPLOYMENT_CONTAINER_IMAGE is required"),
  PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_CPU: z.string().min(1, "PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_CPU is required"),
  PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: z.string().min(1, "PROMETHEUS_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY is required"),
  PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_CPU: z.string().min(1, "PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_CPU is required"),
  PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: z.string().min(1, "PROMETHEUS_DEPLOYMENT_RESOURCES_LIMITS_MEMORY is required"),
  PROMETHEUS_PVC_STORAGE: z.string().min(1, "PROMETHEUS_PVC_STORAGE is required"),

  // RabbitMQ Deployment Schema
  RABBITMQ_DEPLOYMENT_REPLICAS: z.number().min(1, "RABBITMQ_DEPLOYMENT_REPLICAS is required"),
  RABBITMQ_DEPLOYMENT_CONTAINER_IMAGE: z.string().min(1, "RABBITMQ_DEPLOYMENT_CONTAINER_IMAGE is required"),
  RABBITMQ_DEPLOYMENT_RESOURCES_REQUESTS_CPU: z.string().min(1, "RABBITMQ_DEPLOYMENT_RESOURCES_REQUESTS_CPU is required"),
  RABBITMQ_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY: z.string().min(1, "RABBITMQ_DEPLOYMENT_RESOURCES_REQUESTS_MEMORY is required"),
  RABBITMQ_DEPLOYMENT_RESOURCES_LIMITS_CPU: z.string().min(1, "RABBITMQ_DEPLOYMENT_RESOURCES_LIMITS_CPU is required"),
  RABBITMQ_DEPLOYMENT_RESOURCES_LIMITS_MEMORY: z.string().min(1, "RABBITMQ_DEPLOYMENT_RESOURCES_LIMITS_MEMORY is required")
});
