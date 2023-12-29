import { Request, Response } from "express";
import { errorHandler } from "../../utils/ress.error";
import { IResponse } from "../../utils/interface";
import { RequestMethods } from "../../utils/enums";
import { v4 } from "uuid";
import { IBookingResponse, ICreateBookingReqObj } from "./interface"; // Assuming you have relevant interfaces
import BookingsService from "./services"; // Assuming you have a BookingsService class
import { bookingRoutes } from "./enums";
import ErrorHandler from "../../utils/errors.handler";

export default class BookingsController extends BookingsService {
	public execute = async (req: Request, res: Response): Promise<void> => {
		try {
			const method = req.method;
			console.log(req.path);
			const ticketType = req.query.ticketType as string;
			const userId = req.query.userId as string;
			const paymentId = req.query.paymentId as string;
			const ticketId = req.query.ticketId as string;
			const paymentStatus = req.query.paymentStatus as string;
			const ticketIssued = req.query.ticketIssued as string;

			let response: IResponse = {
				success: false,
			};
			let statusCode = 200;

			if (!ticketType || !userId || !paymentStatus || !ticketIssued) {
				throw new ErrorHandler({
					status_code: 400,
					message: "Invalid Query Parameters",
					message_code: "INVALID_QUERY_PARAMS",
				});
			}
			if (req.path === bookingRoutes.POSTBOOKING) {
				if (method === RequestMethods.GET) {
					const reqObj: ICreateBookingReqObj = {
						id: v4(),
						ticket_type: ticketType,
						user_id: userId,
						payment_id: paymentId,
						ticket_id: ticketId,
						payment_status: paymentStatus,
						ticket_status: ticketIssued,

						offline_ticket_issued: false,
						created_at: new Date(),
						updated_at: new Date(),
					};
					const bookingResponse: IBookingResponse =
						await this.createBookingController(reqObj);
					// Additional logic if needed
					response = bookingResponse;
				}
			}
			// else if(req.path === "/livecount"){

			// }

			res.status(statusCode).send(response);
		} catch (error) {
			errorHandler(res, error);
		}
	};

	private createBookingController = async (
		reqObj: ICreateBookingReqObj
	): Promise<IBookingResponse> => {
		const data: string = await this.createBookingService(reqObj);
		return {
			success: true,
			message: "Booking Entered Successfully!",
			messageId: data,
		};
	};
}
