import * as k8s from "@pulumi/kubernetes";
import * as fs from "fs";
import * as path from "path";

const filePath = "C:\\Users\\aland\\.kube\\config";
const kubeConfig = fs.readFileSync(filePath, 'utf-8')

export const localProvider = new k8s.Provider('local-k8s-provider', {
  context: "docker-desktop",
  kubeconfig: kubeConfig,
})