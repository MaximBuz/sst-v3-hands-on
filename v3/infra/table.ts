/**
 * Please create a DynamoDB table with the following options:
 * - TTL: expireAt
 * - Primary index: PK (string), SK (string)
 * - Global Secondary Index: GSI1PK (string), GSI1SK (string)
 * - Pay-per-request billing mode (via transform prop)
 * - A stream sending new and old images (the `search.ts` file will create a subscriber to this stream)
 * 
 * @see https://sst.dev/docs/component/aws/dynamo/
 */

// ------- CODE HERE -------
