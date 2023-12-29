import { Request, Response } from "express";
import { errorHandler } from "../../utils/ress.error";
import { IResponse } from "../../utils/interface";
import { RequestMethods } from "../../utils/enums";
import { v4 } from "uuid";
import {
	BookingObj,
	IBookingResponse,
	ICreateBookingReqObj,
	IOfflineTicketIssuedReqObj,
} from "./interface"; // Assuming you have relevant interfaces
import BookingsService from "./services"; // Assuming you have a BookingsService class
import logger, { LogTypes } from "../../utils/logger";

export default class BookingsController extends BookingsService {
	public execute = async (req: Request, res: Response): Promise<void> => {
		try {
			const queryParams = { ...req.query };
			const reqData = JSON.parse(JSON.stringify(queryParams));

			const method = req.method;
			const routeName = req.route.path.split("/")[1];

			let response: IResponse = {
				success: false,
			};
			let statusCode = 200;

			if (method === RequestMethods.POST) {
				const reqObj: ICreateBookingReqObj = {
					...reqData,
					offline_ticket_issued: false,
					id: v4(),
				};
				const bookingRes: IBookingResponse = await this.createBookingController(
					reqObj
				);
				// Additional logic if needed
				response = bookingRes;
			} else if (method === RequestMethods.PATCH) {
				const booking_id: string = req.params.id;
				const reqObj: IOfflineTicketIssuedReqObj = {
					...reqData,
					booking_id,
				};
				const bookingRes: IBookingResponse =
					await this.issueOfflineTicketController(reqObj);
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

	private issueOfflineTicketController = async (
		reqObj: IOfflineTicketIssuedReqObj
	): Promise<IBookingResponse> => {
		logger(reqObj, LogTypes.LOGS);

		const data: BookingObj = await this.issueOfflineTicketService(reqObj);
		return {
			success: true,
			message: "Offline Ticket Issued Successfully!",
			booking: data,
		};
	};
}
