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

	// protected checkUserExists = async (user_id: string): Promise<boolean> => {
	// const query = `SELECT EXISTS(SELECT 1 FROM bookings WHERE user_id = $1);`;
	// const { rows } = await db.query(query, [user_id]);

	// return rows[0] as unknown as any;
	// }
	protected checkTicketIssued = async (ticket_id: string): Promise<any> => {
		const query = `SELECT offline_ticket_issued FROM bookings WHERE ticket_id = $1 ;`;

		const { rows } = await db.query(query, [ticket_id]);

		return rows[0] as unknown as any;
	};
	protected UserEmail = async (user_id: string): Promise<any> => {
		const query = `SELECT email FROM users WHERE id = $1;`;
		const { rows } = await db.query(query, [user_id]);
		return rows[0] as unknown as string;
	};
	protected checkUserExists = async (user_id: string): Promise<boolean> => {
		const query = `SELECT EXISTS(
		SELECT 1 FROM users WHERE id = $1 AND is_deleted = false
		);`;
		const { rows } = await db.query(query, [user_id]);

		return rows[0] as unknown as boolean;
	};

	protected updateOfflineTicketIssued = async (
		user_id: string,
		ticket_id: string,
		payment_id: string
	): Promise<ICreateBookingReqObj> => {
		const query = `UPDATE bookings AS b
    SET offline_ticket_issued = true, updated_at = current_timestamp
    FROM users AS u
    WHERE b.user_id = u.id
      AND b.ticket_id = $2
      AND b.payment_id = $3
      AND b.user_id = $1
    RETURNING b.*, u.name, u.reg_number, u.email 
    ;`;

		const { rows } = await db.query(query, [user_id, ticket_id, payment_id]);

		return rows[0] as unknown as any;
	};
}
// Assuming you have a BookingsService class with methods for handling bookings
