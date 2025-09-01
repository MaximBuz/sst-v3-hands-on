/**
 * Please create and export dead-letter queue (DLQ) with the following options:
 * - 65 second visibility timeout
 * - 14 day retention period (via transform prop)
 */
export const dlq = new sst.aws.Queue("DeadLetterQueue", {
  visibilityTimeout: "65 seconds",
  transform: {
    queue: (args) => {
      args.messageRetentionSeconds = 14 * 24 * 60 * 60; // 14 days in seconds
    },
  },
});
