import type { SQSHandler } from "aws-lambda";

export const handler: SQSHandler = async (event) => {
  const bucketName = process.env.BUCKET_NAME;

  console.log({ bucketName });
};
