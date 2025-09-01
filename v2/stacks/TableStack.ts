import { StackContext, Table } from "sst/constructs";
import { aws_dynamodb as dynamodb } from "aws-cdk-lib";

export function TableStack({ stack }: StackContext) {
  const table = new Table(stack, "Table", {
    timeToLiveAttribute: "expireAt",

    fields: {
      PK: "string",
      SK: "string",

      GSI1PK: "string",
      GSI1SK: "string",
    },

    primaryIndex: {
      partitionKey: "PK",
      sortKey: "SK",
    },

    globalIndexes: {
      GSI1: {
        partitionKey: "GSI1PK",
        sortKey: "GSI1SK",
      },
    },

    cdk: {
      table: {
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      },
    },

    stream: "new_and_old_images",
  });

  stack.addOutputs({ Table: table.tableName });

  return { table };
}
