import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as acmeVpc from "./components/vpc";

const awsConfig = new pulumi.Config("aws");

export = async () => {

    const vpc = new acmeVpc.Vpc("vpc", {
        availabilityZones: ["ap-southeast-2a", "ap-southeast-2b"],
        cidrBlock: "10.42.0.0/16",
        ownerEmail: "aureq@pulumi.com",         // change me
        region: awsConfig.require("region"),
        subnetMask: "255.255.240.0",
        enableDnsHostnames: true,
        enableDnsSupport: true,
    });

    // const sshSg = new aws.ec2.SecurityGroup("aws-sg-allowSsh", {
    //     vpcId: vpc.vpc.id,
    //     description: "Allow SSH inbound traffic",
    //     tags: {
    //         'Name': "aws-sg-allowSsh",
    //     },
    //     ingress: [{
    //         cidrBlocks: ['0.0.0.0/0'],
    //         fromPort: 22,
    //         toPort: 22,
    //         protocol: 'tcp',
    //         description: 'SSH to VPC'
    //     }],
    //     egress: [{
    //         cidrBlocks: ['0.0.0.0/0'],
    //         fromPort: 0,
    //         toPort: 0,
    //         protocol: '-1'
    //     }],
    // }, {
    //     parent: vpc
    // });

    return {
        vpcId: vpc.vpc.id
    }
}