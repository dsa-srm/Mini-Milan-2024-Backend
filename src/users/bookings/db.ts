import db from "../../config/pg.config";
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
		const query = db.format(`INSERT INTO bookings ? RETURNING *`, reqObj);

		const { rows } = await db.query(query);
		return rows[0] as unknown as BookingObj;
	};

	// Additional database methods specific to booking functionality can be added here
}
