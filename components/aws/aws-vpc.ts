import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export const awsVPC = new aws.ec2.Vpc("jobsbolt-aws-vpc", {
  cidrBlock: "10.0.0.0/16",
  enableDnsHostnames: true,
  enableDnsSupport: true,
});

// Create a subnet in availability zone 'us-east-1a' for example
const subnet1 = new aws.ec2.Subnet("subnet1", {
  vpcId: awsVPC.id,
  cidrBlock: "10.0.1.0/24",
  availabilityZone: "us-east-1a",
});
