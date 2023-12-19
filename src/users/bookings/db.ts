import db from "../../config/pg.config";
import ErrorHandler from "../../utils/errors.handler";
import { ICreateBookingReqObj, BookingObj } from "./interface";

export default class BookingsDB {
	protected getBooking = async (bookingId: string): Promise<BookingObj> => {
		const query = `SELECT * FROM bookings WHERE id = $1 LIMIT 1`;

		const { rows } = await db.query(query, [bookingId]);

		return rows[0] as unknown as BookingObj;
	};

	protected createBooking = async (
		reqObj: ICreateBookingReqObj
	): Promise<BookingObj> => {
		reqObj.created_at = new Date();
		reqObj.updated_at = new Date();

		const query = db.format(`INSERT INTO bookings ? RETURNING *`, reqObj);

		try {
			const { rows } = await db.query(query);
			return rows[0] as unknown as BookingObj;
		} catch (err) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Something went wrong while creating booking",
				message_code: "ENTER_VALID_DETAILS",
			});
		}
	};

	// Additional database methods specific to booking functionality can be added here
}
