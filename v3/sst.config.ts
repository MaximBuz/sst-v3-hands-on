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
    /**
     * Please import the following files:
     * - table.ts
     * - search.ts
     * - deadLetterQueue.ts
     * - storage.ts
     * - api.ts
     *
     * @see https://sst.dev/docs/set-up-a-monorepo/#infrastructure
     */

    /**
     * Please use the File Upload Queue URL's (`storage.ts`) `apply` method to construct the following string:
     * `${fileUploadQueueUrl}-${stageName}`
     *
     * @see https://sst.dev/docs/components/#apply
     */
    const QueueStageUrlUsingApply = "TODO";

    /**
     * Please use the global `$interpolate` method to construct the following string:
     * `${fileUploadQueueUrl}-${stageName}`
     *
     * @see https://sst.dev/docs/components/#interpolate
     */
    const QueueStageUrlUsingInterpolate = "TODO";

    /**
     * Please return the following items:
     * - DeadLetterQueueUrl
     * - BucketName
     * - ApiUrl
     * - TableName 
     */
    return {
      QueueStageUrlUsingApply,
      QueueStageUrlUsingInterpolate,
    };
  },
});
