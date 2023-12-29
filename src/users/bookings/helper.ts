import { ICreateBookingReqObj } from "./interface";
import ErrorHandler from "../../utils/errors.handler";
import BookingsDB from "./db";
import {
	SQSClient,
	SendMessageCommand,
	ReceiveMessageCommand,
	DeleteMessageCommand,
} from "@aws-sdk/client-sqs";

import dotenv from "dotenv";
dotenv.config();
const sqsClient = new SQSClient({
	region: process.env.AWS_REGION,
});
export default class BookingsHelper extends BookingsDB {
	protected insertBookingInSqs = async (reqObj: ICreateBookingReqObj) => {
		const messageData = {
			id: reqObj.id,
			ticket_type: reqObj.ticket_type,
			user_id: reqObj.user_id,
			payment_id: reqObj.payment_id,
			ticket_id: reqObj.ticket_id,
			payment_status: reqObj.payment_status,
			ticket_status: reqObj.ticket_status,
			offline_ticket_issued: reqObj.offline_ticket_issued,
			updated_at: reqObj.updated_at,
			created_at: reqObj.created_at,
		};
		if (!process.env.SQS_QUEUE_URL)
			throw new ErrorHandler({
				status_code: 400,
				message: "SQS_QUEUE_URL not found",
				message_code: "SQS_URL_NOT_FOUND",
			});

		const queueUrl =
			process.env.SQS_QUEUE_URL ||
			"https://sqs.ap-south-1.amazonaws.com/322653267300/booking-post.fifo";
		const messageGroupId: string = "booking-post";
		const sendMessageCommand = new SendMessageCommand({
			QueueUrl: queueUrl,
			MessageBody: JSON.stringify(messageData),
			MessageGroupId: messageGroupId,
		});

		const result = await sqsClient.send(sendMessageCommand);
		console.log("Message sent to SQS:", result.MessageId);
		return result;
	};
}
