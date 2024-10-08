import { rabbitmqDeployment } from "./rabbitmq-deployment"
import { rabbitmqService } from "./rabbitmq-service";
import { rabbitmqConfigMap } from "./rabbitmq-config";

export const rabbitmqModule = () => {
  return { deployment: rabbitmqDeployment(), service: rabbitmqService(), configMap: rabbitmqConfigMap() }
}