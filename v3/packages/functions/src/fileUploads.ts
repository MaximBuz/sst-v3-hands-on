import type { SQSHandler } from "aws-lambda";
import { Resource } from "sst";

/**
 * Please log the Buckets name using the sst SDK
 */
export const handler: SQSHandler = async (event) => {
  const bucketName = Resource.Bucket.name;

  console.log({ bucketName });
};
