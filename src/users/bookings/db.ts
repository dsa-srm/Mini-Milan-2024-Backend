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
 
	public async getTotalBookings(): Promise<number> {
		try {
		  const queryResult = await db.query('SELECT COUNT(*) FROM bookings');
		  const totalBookings = parseInt(queryResult.rows[0], 10);
		  return totalBookings;
		} catch (error) {
		  console.error('Error fetching total bookings:', error);
		  throw new Error('Error fetching total bookings');
		}
	  }
	// Additional database methods specific to booking functionality can be added here
}
// Assuming you have a BookingsService class with methods for handling bookings


