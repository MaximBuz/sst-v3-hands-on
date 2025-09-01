import { table } from "./table";

/**
 * Please create and export new Secret called 'MeiliSearchApiKey'
 */
export const meiliSearchApiKey = new sst.Secret("MeiliSearchApiKey");

/**
 * Please subscribe a Lambda function to the stream from the DynamoDB table.
 * - Provide the lambda with a link to our dynamodb table from `table.ts`
 * - Provide the lambda with a link to our MeiliSearchApiKey secret
 * - In the lambda handler in `packages/functions/src/searchIndexing.handler`, log the MeiliSearchApiKey and table name using the sst sdk
 */
table.subscribe("SearchIndexingLambda", {
  handler: "packages/functions/src/searchIndexing.handler", 
  link: [table, meiliSearchApiKey],
});
