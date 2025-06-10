import * as pulumi from "@pulumi/pulumi";
import { localProvider } from "./localProvider"
import { awsEksProvider } from "../aws/aws-eks"

const stack = pulumi.getStack()
let provider: pulumi.ProviderResource

if (stack === "local") {
  provider = localProvider
} else if (stack === "dev") {
  provider = awsEksProvider
}

export { provider }