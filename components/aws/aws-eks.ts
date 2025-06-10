import * as pulumi from "@pulumi/pulumi";
import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";
import { awsVPC } from './aws-vpc'


export const awsEks = new eks.Cluster("jobsbolt-aws-eks", {
  // vpcId: awsVPC.id,
  nodeGroupOptions: {
    desiredCapacity: 2,
    minSize: 1,
    maxSize: 3,
    instanceType: "t3.large"
  }
});

const awsEksCubeConfig = awsEks.kubeconfig

export const awsEksProvider = new k8s.Provider("aws-kubernetes-provider", { kubeconfig: awsEksCubeConfig })