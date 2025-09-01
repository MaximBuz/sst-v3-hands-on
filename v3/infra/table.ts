/**
 * Please create a DynamoDB table with the following options:
 * - TTL: expireAt
 * - Primary index: PK (string), SK (string)
 * - Global Secondary Index: GSI1PK (string), GSI1SK (string)
 * - Pay-per-request billing mode (via transform prop)
 * - A stream sending new and old images (the `stream.ts` file will create a subscriber to this stream)
 */
export const table = new sst.aws.Dynamo("Table", {
  ttl: "expireAt",

  fields: {
    PK: "string",
    SK: "string",

    GSI1PK: "string",
    GSI1SK: "string",
  },

  primaryIndex: {
    hashKey: "PK",
    rangeKey: "SK",
  },

  globalIndexes: {
    GSI1: {
      hashKey: "GSI1PK",
      rangeKey: "GSI1SK",
    },
  },

  transform: {
    table: (args) => {
      args.billingMode = "PAY_PER_REQUEST";
    },
  },

  stream: "new-and-old-images",
});
