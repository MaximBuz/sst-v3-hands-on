export const dynamo = new sst.aws.Dynamo("DemoDynamo", {
  ttl: "expires",

  fields: {
    PK: "string",
    SK: "string",
    GSI1PK: "string",
    GSI1SK: "string",
  },

  primaryIndex: { hashKey: "PK", rangeKey: "SK" },

  transform: {
    table: (args) => {
      args.billingMode = "PAY_PER_REQUEST";
      args.globalSecondaryIndexes = [
        {
          name: "GSI1",
          projectionType: "ALL",
          hashKey: "GSI1PK",
          rangeKey: "GSI1SK",
        },
      ];
    },
  },
});
