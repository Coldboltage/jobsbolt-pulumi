import { prometheusConfigMap } from "./prometheus-config"
import { prometheusDeployment } from "./prometheus-deployment"
import { prometheusPV } from "./prometheus-pv"
import { prometheusService } from "./prometheus-service"
import { prometheusPVC } from "./prometheus.pvc"

export const prometheusModule = () => {
  return { deployment: prometheusDeployment(), pvc: prometheusPVC(), service: prometheusService(), configMap: prometheusConfigMap(), pv: prometheusPV() }
}