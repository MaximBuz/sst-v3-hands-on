import { Queue, StackContext } from "sst/constructs";
import { Duration } from "aws-cdk-lib";

export function DeadLetterQueueStack({ stack }: StackContext) {
  const dlq = new Queue(stack, "DeadLetterQueue", {
    cdk: {
      queue: {
        visibilityTimeout: Duration.seconds(65),
        retentionPeriod: Duration.days(14),
      },
    },
  });

  stack.addOutputs({
    DeadLetterQueue: dlq.queueName,
  });

  return { dlq };
}
