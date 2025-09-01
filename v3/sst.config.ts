/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "v3",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },

  async run() {
    const table = await import("./infra/table");
    const search = await import("./infra/search");
    const deadLetterQueue = await import("./infra/deadLetterQueue");
    const storage = await import("./infra/storage");
    const api = await import("./infra/api");

    /**
     * Please use the File Upload (`storage.ts`) Queues.url's `apply` method to export the following string:
     * `${fileUploadQueueUrl}-${stageName}`
     */
    const QueueStageUrlUsingApply = storage.queue.url.apply(
      (value) => `${value}-${$app.stage}`
    );

    /**
     * Please use the global `$interpolate` method to export the following string:
     * `${fileUploadQueueUrl}-${stageName}`
     */
    const QueueStageUrlUsingInterpolate = $interpolate`${storage.queue.url}-${$app.stage}`;

    return {
      DeadLetterQueue: deadLetterQueue.dlq.url,
      Bucket: storage.bucket.name,
      ApiUrl: api.api.url,
      Table: table.table.name,
      QueueStageUrlUsingApply,
      QueueStageUrlUsingInterpolate,
    };
  },
});
