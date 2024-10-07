import { Input, Resource } from "@pulumi/pulumi";
import { grafanaPvc } from "./grafana-pvc";
import { grafanaService } from "./grafana-service";
import { grafanaVolume } from "./grafana-volume";
import { grafanaDeployment } from "./grafana-deployment";

export const grafanaModule = (...depends: Input<Resource>[]) => {
  return { deployment: grafanaDeployment(...depends), service: grafanaService(), pvc: grafanaPvc(), volume: grafanaVolume() }
}