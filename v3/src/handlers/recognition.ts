import type { SQSEvent, S3Event, S3EventRecord } from "aws-lambda";
import AWS from "aws-sdk";

const rekognition = new AWS.Rekognition();

export const handler = async (event: SQSEvent): Promise<void> => {
  console.log("SQS batch size:", event.Records.length);

  for (const [i, record] of event.Records.entries()) {
    try {
      const body = parseJson(record.body);

      // Handle both direct S3 -> SQS notifications and generic messages with embedded Records
      const s3Event: S3Event | undefined =
        isS3Event(body) ? body : isS3Event(body?.Message) ? body.Message : undefined;

      if (!s3Event?.Records?.length) {
        console.warn(
          "Record %d skipped: message does not contain an S3 event payload",
          i
        );
        continue;
      }

      for (const [j, s3rec] of s3Event.Records.entries()) {
        const bucket = s3rec.s3.bucket.name;
        const key = decodeS3Key(s3rec);

        if (!bucket || !key) {
          console.warn(
            "Record %d:%d skipped: missing bucket or key. Payload: %s",
            i,
            j,
            JSON.stringify(s3rec)
          );
          continue;
        }

        console.log("Detecting faces for s3://%s/%s", bucket, key);

        try {
          const res = await rekognition
            .detectFaces({
              Image: { S3Object: { Bucket: bucket, Name: key } },
              Attributes: ["DEFAULT"],
            })
            .promise();

          console.log(
            "Rekognition.detectFaces result for s3://%s/%s: %s",
            bucket,
            key,
            JSON.stringify(res)
          );
        } catch (err) {
          console.error(
            "Rekognition.detectFaces failed for s3://%s/%s: %s",
            bucket,
            key,
            errorMessage(err)
          );
        }
      }
    } catch (err) {
      console.error(
        "Failed to process SQS record %d: %s. Body: %s",
        i,
        errorMessage(err),
        record.body
      );
      // Intentionally continue to next record to avoid failing entire batch
    }
  }
};

function parseJson<T = any>(str: string): T | undefined {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
}

function isS3Event(obj: any): obj is S3Event {
  return (
    !!obj &&
    Array.isArray(obj.Records) &&
    obj.Records.length > 0 &&
    !!obj.Records[0].s3
  );
}

function decodeS3Key(rec: S3EventRecord): string {
  // S3 may URL-encode keys in event notifications
  const raw = rec.s3.object.key || "";
  // Replace '+' with space before decoding
  return decodeURIComponent(raw.replace(/\+/g, " "));
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message}`;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
