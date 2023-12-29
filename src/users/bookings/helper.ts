<<<<<<< HEAD
import {
	ICreateBookingReqObj,
	BookingObj,
	IOfflineTicketIssuedReqObj,
} from "./interface";
=======
import { ICreateBookingReqObj } from "./interface";
>>>>>>> cddf6baaa5ee704264d93596f5dd8dfb247c2281
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

<<<<<<< HEAD
		// Additional validation and business logic can be added here
		const booking = await this.createBooking(reqObj);

		if (!booking) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Something went wrong while creating booking",
				message_code: "SOMETHING_WENT_WRONG",
			});
		}

		return booking;
	};

	protected issueOfflineTicketHelper = async (
		reqObj: IOfflineTicketIssuedReqObj
	): Promise<BookingObj> => {
		try {
			const booking: BookingObj = await this.issueOfflineTicket(reqObj);
			if (!booking) {
				throw new ErrorHandler({
					status_code: 400,
					message: "Something went wrong while issuing offline ticket",
					message_code: "SOMETHING_WENT_WRONG",
				});
			}
			return booking;
		} catch (err) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Booking not found",
				message_code: "SOMETHING_WENT_WRONG",
			});
		}
	};

	// Additional helper methods specific to booking functionality can be added here
=======
    const result = await sqsClient.send(sendMessageCommand);
    console.log("Message sent to SQS:", result.MessageId);
    return result;
  };
>>>>>>> cddf6baaa5ee704264d93596f5dd8dfb247c2281
}
