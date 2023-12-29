import {
	ICreateBookingReqObj,
	BookingObj,
	IOfflineTicketIssuedReqObj,
} from "./interface";
import ErrorHandler from "../../utils/errors.handler";
import BookingsDB from "./db";

export default class BookingsHelper extends BookingsDB {
	protected createBookingHelper = async (
		reqObj: ICreateBookingReqObj
	): Promise<BookingObj> => {
		reqObj.created_at = new Date();
		reqObj.updated_at = new Date();

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
}
