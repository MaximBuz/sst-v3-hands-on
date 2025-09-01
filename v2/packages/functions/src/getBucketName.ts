import type { Handler } from "aws-lambda";

export const handler: Handler = async () => {
  const bucketName = process.env.BUCKET_NAME ?? "";
  
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ bucket: bucketName }),
  };
};

