import { bucket } from "./bucket";

export const queue = new sst.aws.Queue("DemoQueue", {
  visibilityTimeout: `30 seconds`,
});

queue.subscribe({
  handler: "src/handlers/recognition.handler",
  timeout: "30 seconds",
  permissions: [
    { effect: "allow", actions: ["rekognition:DetectFaces"], resources: ["*"] },
  ],
});

bucket.notify({
  notifications: [
    {
      name: "ObjectCreatedNotification",
      queue,
      events: ["s3:ObjectCreated:*"],
      filterPrefix: "images/",
    },
  ],
});
