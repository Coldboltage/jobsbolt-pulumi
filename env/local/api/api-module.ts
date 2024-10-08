import { apiDeployment } from "./api-deployment"
import { apiConfigMap } from "./api-config";
import { apiService } from "./api-service";
import { apiSecret } from "./api-secret";
import { Input, Resource } from "@pulumi/pulumi";

export const apiModule = (...rest: Input<Resource>[]) => {
  return { deployment: apiDeployment(...rest), configMap: apiConfigMap(), service: apiService(), secret: apiSecret() }
}