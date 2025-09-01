import { dlq } from "./deadLetterQueue";

/**
 * - Create and export new S3 bucket called 'Bucket'
 * - Create and and export SQS Queue called 'UploadsQueue' that is notified when an object is created in the bucket
 * - Attach the DLQ from `deadLetterQueue.ts` to above queue
 * - Subscribe a handler function to the sqs queue, that uses the handler code in `packages/functions/src/fileUploads.handler`
 * - Link the bucket to the handler function
 */
export const bucket = new sst.aws.Bucket("Bucket");

export const queue = new sst.aws.Queue("UploadsQueue", {
  dlq: { queue: dlq.arn, retry: 5 },
});

queue.subscribe({
  handler: "packages/functions/src/s3-events.handler",
  link: [bucket],
});

bucket.notify({
  notifications: [
    { name: "S3FileUploadQueue", events: ["s3:ObjectCreated:*"], queue },
  ],
});
