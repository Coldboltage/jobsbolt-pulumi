import { postgresConfigMap } from "./postgres-config"
import { postgresDeployment } from "./postgres-deployment"
import { postgresPV } from "./postgres-pv"
import { postgresSecret } from "./postgres-secret"
import { postgresService } from "./postgres-service"
import { postgresPVC } from "./postgres.pvc"

export const postgresModule = () => {
  return { deployment: postgresDeployment(), pvc: postgresPVC(), service: postgresService(), secret: postgresSecret(), configMap: postgresConfigMap(), pv: postgresPV() }
}