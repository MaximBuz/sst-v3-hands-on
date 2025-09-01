import { StackContext, Bucket, Queue, use } from "sst/constructs";
import { DeadLetterQueueStack } from "./DeadLetterQueueStack";

export function StorageStack({ stack }: StackContext) {
  const { dlq } = use(DeadLetterQueueStack);

  const queue = new Queue(stack, "UploadsQueue", {
    consumer: {
      function: {
        handler: "packages/functions/src/fileUploads.ts",
      },
    },
    cdk: {
      queue: {
        deadLetterQueue: {
          queue: dlq.cdk.queue,
          maxReceiveCount: 5,
        },
      },
    },
  });

  const bucket = new Bucket(stack, "Bucket", {
    notifications: {
      S3FileUploadQueue: {
        type: "queue",
        events: ["object_created"],
        queue,
      },
    },
  });

  queue.bind([bucket]);

  stack.addOutputs({
    Bucket: `${bucket.bucketName}-${stack.stage}`,
  });

  return { bucket, queue };
}
