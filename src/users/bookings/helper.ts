import { ICreateBookingReqObj, BookingObj } from "./interface";
import ErrorHandler from "../../utils/errors.handler";
import BookingsDB from "./db";

export default class BookingsHelper extends BookingsDB {
	protected createBookingHelper = async (
		reqObj: ICreateBookingReqObj
	): Promise<BookingObj> => {
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

	// Additional helper methods specific to booking functionality can be added here
}
