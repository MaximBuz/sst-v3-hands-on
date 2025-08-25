import { SSTConfig } from "sst";
import { BucketStack } from "./stacks/BucketStack";
import { DynamoStack } from "./stacks/DynamoStack";

export default {
  config(_input) {
    return {
      name: "v2",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app.stack(DynamoStack).stack(BucketStack);
  },
} satisfies SSTConfig;
