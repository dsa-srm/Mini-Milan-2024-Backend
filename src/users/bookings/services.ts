import { v4 } from "uuid";
import ErrorHandler from "../../utils/errors.handler";
import { BookingObj, ICreateBookingReqObj } from "./interface";
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
		const booking: BookingObj = await this.createBookingHelper(reqObj);

		return booking;
	};
}
