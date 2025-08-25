/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "v3",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const { bucket } = await import("./infra/bucket");
    const { dynamo } = await import("./infra/dynamo");
    const { queue } = await import("./infra/rekognition");

    return {
      PrimaryTableName: dynamo.name,
      PrimaryTableArn: dynamo.arn,
      Bucketname: bucket.name,
      BucketArn: bucket.arn,
    };
  },
});
