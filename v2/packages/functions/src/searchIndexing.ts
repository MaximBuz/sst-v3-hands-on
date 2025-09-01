import type { DynamoDBStreamEvent } from "aws-lambda";

export const handler = async ({ Records }: DynamoDBStreamEvent) => {
  const meilisearchApiKey = process.env.MEILISEARCH_API_KEY;
  const tableName = process.env.TABLE_NAME;

  console.log({ meilisearchApiKey, tableName });
};
