import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { bucket } = use(StorageStack);

  stack.setDefaultFunctionProps({
    timeout: 30,
    environment: { stage: stack.stage },
  });

  const api = new Api(stack, "AppApi", {
    routes: {
      "GET /bucket-name": {
        function: {
          handler: "packages/functions/src/getBucketName.ts",
          environment: { BUCKET_NAME: bucket.bucketName },
          bind: [bucket],
        },
      },
    },
  });

  stack.addOutputs({ ApiUrl: api.url });
}
