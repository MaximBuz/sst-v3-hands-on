import { bucket } from "./storage";

/**
 * Please use the global $transform function to apply the following defaults to all functions:
 * - 30 second timeout
 * - include a 'stage' environment variable using the global $app object
 */
$transform(sst.aws.Function, (args) => {
  args.timeout ??= "30 seconds"; // Only set when not explicitly provided by the Function resource
  args.environment ??= {};
  args.environment = { ...args.environment, stage: $app.stage };
  return args;
});

/**
 * Please create and export an HTTP API Gateway (ApiGatewayV2) 
 * - add a GET /bucket-name route.
 * - Add a Lambda handler to process calls to the endpoint
 * - Link the S3 Bucket from `storage.ts` to the lambda handler
 * - Return the bucket name in the lambda handler code in `packages/functions/src/api.handler`
 */
export const api = new sst.aws.ApiGatewayV2("AppApi");

api.route("GET /bucket-name", {
  handler: "packages/functions/src/getBucketName.handler",
  link: [bucket],
});
