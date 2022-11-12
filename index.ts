import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as acmeVpc from "./components/vpc";

const awsConfig = new pulumi.Config("aws");

export = async () => {

    const vpc = new acmeVpc.Vpc("vpc", {
        availabilityZones: ["ap-southeast-2a", "ap-southeast-2b"],
        cidrBlock: "10.42.0.0/16",
        ownerEmail: "aureqw@pulumi.com",
        region: awsConfig.require("region"),
        subnetMask: "255.255.240.0",
        enableDnsHostnames: true,
        enableDnsSupport: true,
    })
    return {}
}