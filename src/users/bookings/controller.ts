import { Request, Response } from "express";
import { errorHandler } from "../../utils/ress.error";
import { IResponse } from "../../utils/interface";
import { RequestMethods } from "../../utils/enums";
import { v4 } from "uuid";
import {
	BookingObj,
	IBookingResponse,
	ICreateBookingReqObj,
} from "./interface"; // Assuming you have relevant interfaces
import BookingsService from "./services"; // Assuming you have a BookingsService class

export default class BookingsController extends BookingsService {
	public execute = async (req: Request, res: Response): Promise<void> => {
		try {
			const method = req.method;
			// const routeName = req.route.path.split("/")[1];
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

			if (method === RequestMethods.POST) {
				const reqObj: ICreateBookingReqObj = {
					...req.body,
					offline_ticket_issued: false,
					id: v4(),
				};
				const bookingRes: IBookingResponse = await this.createBookingController(
					reqObj
				);
				// Additional logic if needed
				response = bookingRes;
			}
			res.status(statusCode).send(response);
		} catch (error) {
			errorHandler(res, error);
		}
	};

	private createBookingController = async (
		reqObj: ICreateBookingReqObj
	): Promise<IBookingResponse> => {
		const data: BookingObj = await this.createBookingService(reqObj);
		return {
			success: true,
			message: "Booking Created Successfully!",
			booking: data,
		};
	};
}
