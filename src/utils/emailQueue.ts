import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import * as dotenv from "dotenv";

dotenv.config();

const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

export const queueEmail = async (
  email: string,
  user_id: string,
  payment_id: string,
  ticket_id: string
) => {
  try {
    const input = {
      QueueUrl: process.env.AWS_SQS_URL,
      MessageBody: email,
      MessageAttributes: {
        UserId: {
          DataType: "String",
          StringValue: user_id,
        },
        PaymentId: {
          DataType: "String",
          StringValue: payment_id,
        },
        Ticket_id: {
          DataType: "String",
          StringValue: ticket_id,
        },
      },
    };
    return await sqsClient.send(new SendMessageCommand(input));
  } catch (err) {
    console.error(err);
  }
};
