// generat k8 deployment for work
import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

const appLabels = { app: "jobsbolt", component: "worker" };

export const workerDeployment = new k8s.apps.v1.Deployment("jobsbolt-worker-deployment", {
    metadata: {
        namespace: "default",
        name: "jobsbolt-worker-deployment",
        labels: appLabels,
        annotations: { "app.kubernetes.io/managed-by": "pulumi" },
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: appLabels,
        },
        template: {
            metadata: { labels: appLabels, },
            spec: {
                containers: [{
                    name: "worker",
                    image: "jobsbolt/worker:latest",
                    resources: {
                        requests: { cpu: '200m', memory: '300Mi' },
                        limits: { cpu: '1', memory: '1Gi' },
                    },
                    env: []
                },
                ],
            },
        },
    },
});