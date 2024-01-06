import db from "../../config/pg.config";
import {
	IBookingGetResObj,
	ICreateBookingReqObj,
	IUpdateTicketReqObj,
} from "./interface";

export default class BookingsDB {
	protected getUserBooking = async (
		user_id: string
	): Promise<IBookingGetResObj> => {
		const query = `SELECT * FROM bookings WHERE User_id = $1 LIMIT 1;`;

		const { rows } = await db.query(query, [user_id]);

		return rows[0] as unknown as IBookingGetResObj;
	};

	protected getBooking = async (
		bookingId: string
	): Promise<ICreateBookingReqObj> => {
		const query = `SELECT * FROM bookings WHERE id = $1 LIMIT 1;`;

		const { rows } = await db.query(query, [bookingId]);

		return rows[0] as unknown as ICreateBookingReqObj;
	};
	protected getTotalBookingCount = async (): Promise<number> => {
		const query = `SELECT COUNT(*) FROM bookings;`;

		const { rows } = await db.query(query);
		return rows[0] as unknown as number;
	};

	protected createBooking = async (
		reqObj: ICreateBookingReqObj
	): Promise<ICreateBookingReqObj> => {
		const query = db.format(`INSERT INTO bookings ? RETURNING *`, reqObj);

		const { rows } = await db.query(query);
		return rows[0] as unknown as ICreateBookingReqObj;
	};

	protected checkTicketIssued = async (ticket_id: string): Promise<boolean> => {
		const query = `SELECT offline_ticket_issued FROM bookings WHERE ticket_id = $1 LIMIT 1;`;

		const { rows } = await db.query(query, [ticket_id]);

		return rows[0] as unknown as boolean;
	};

	protected checkUserExists = async (user_id: string): Promise<boolean> => {
		const query = `SELECT EXISTS(SELECT 1 FROM bookings WHERE user_id = $1);`;
		const { rows } = await db.query(query, [user_id]);

		return rows[0] as unknown as boolean;
	};

	protected updateOfflineTicketIssued = async (
		user_id: string,
		ticket_id: string,
		payment_id: string
	): Promise<any> => {
		const query = `UPDATE bookings SET offline_ticket_issued = true WHERE user_id = $1 AND ticket_id = $2 AND payment_id = $3 RETURNING *;`;
		const { rows } = await db.query(query, [user_id, ticket_id, payment_id]);

		return rows[0] as unknown as any;
	};
}
// Assuming you have a BookingsService class with methods for handling bookings
