import { Resource } from "sst";
import { Handler } from "aws-lambda";

/**
 * Please return the 'Buckets' name using the sst SDK here
 */
export const handler: Handler = async (_event) => {
  const bucketName = Resource.Bucket.name;

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ bucket: bucketName }),
  };
};
