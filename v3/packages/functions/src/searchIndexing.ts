import { DynamoDBStreamEvent } from "aws-lambda";
import { Resource } from "sst";

/**
 * Please log the 'MeiliSearchApiKey' value using the sst SDK here
 */
export const handler = async ({ Records }: DynamoDBStreamEvent) => {
  const meilisearchApiKey = Resource.MeiliSearchApiKey.value;
  const tableName = Resource.Table.name;

  console.log({ meilisearchApiKey, tableName });
};
