import { v4 } from "uuid";
import ErrorHandler from "../../utils/errors.handler";
import {  ICreateBookingReqObj } from "./interface";
import JWTUtils from "../../utils/jwt.utils"; // Assuming you have a JWTUtils class
import BookingsHelper from "./helper"; // Assuming you have a BookingsHelper class

export default class BookingsService extends BookingsHelper {
	jwtHelper: JWTUtils;

	constructor() {
		super();
		this.jwtHelper = new JWTUtils();
	}

	protected createBookingService = async (
		reqObj: ICreateBookingReqObj
	): Promise<any> => {

<<<<<<< HEAD
		return booking;
	};

	protected issueOfflineTicketService = async (reqObj: any): Promise<any> => {
		const booking: BookingObj = await this.issueOfflineTicketHelper(reqObj);

		return booking;
	};
=======
		const sqsResponse = await this.insertBookingInSqs(reqObj);
		return sqsResponse.MessageId;
		
	}	

>>>>>>> cddf6baaa5ee704264d93596f5dd8dfb247c2281
}
