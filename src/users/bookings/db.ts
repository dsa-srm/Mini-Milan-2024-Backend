import db from "../../config/pg.config";
<<<<<<< HEAD
import {
	ICreateBookingReqObj,
	BookingObj,
	IOfflineTicketIssuedReqObj,
} from "./interface";
=======
import { ICreateBookingReqObj } from "./interface";
>>>>>>> cddf6baaa5ee704264d93596f5dd8dfb247c2281

export default class BookingsDB {
	protected getBooking = async (bookingId: string): Promise<ICreateBookingReqObj> => {
		const query = `SELECT * FROM bookings WHERE id = $1 LIMIT 1`;

		const { rows } = await db.query(query, [bookingId]);

		return rows[0] as unknown as ICreateBookingReqObj;
	};

	protected createBooking = async (
		reqObj: ICreateBookingReqObj
	): Promise<ICreateBookingReqObj> => {
		const query = db.format(`INSERT INTO bookings ? RETURNING *`, reqObj);

		const { rows } = await db.query(query);
		return rows[0] as unknown as ICreateBookingReqObj;
	};

	protected issueOfflineTicket = async (
		reqObj: IOfflineTicketIssuedReqObj
	): Promise<BookingObj> => {
		const query = `UPDATE bookings SET offline_ticket_issued = true WHERE ticket_id = $1 AND payment_id = $2 RETURNING *`;

		const { rows } = await db.query(query, [
			reqObj.ticket_id,
			reqObj.payment_id,
		]);

		return rows[0] as unknown as BookingObj;
	};
	// Additional database methods specific to booking functionality can be added here
}
