/**
 * - Create and export new S3 bucket called 'Bucket'
 * - Create and and export SQS Queue called 'UploadsQueue' that is notified when an object is created in the bucket
 * - Attach the DLQ from `deadLetterQueue.ts` to above queue
 * - Subscribe a handler function to the sqs queue, that uses the handler code in `packages/functions/src/fileUploads.handler`
 * - Link the bucket to the handler function (see https://sst.dev/docs/linking/)
 * 
 * @see https://sst.dev/docs/component/aws/bucket/ (Bucket)
 * @see https://sst.dev/docs/component/aws/bucket/#notify (Bucket.notify)
 * @see https://sst.dev/docs/component/aws/queue/#subscribe (Queue.subscribe)
 */

// ------- CODE HERE -------