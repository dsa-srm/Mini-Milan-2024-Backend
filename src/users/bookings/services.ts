import { v4 } from "uuid";
import ErrorHandler from "../../utils/errors.handler";
import { BookingObj, ICreateBookingReqObj } from "./interface";
import JWTUtils from "../../utils/jwt.utils"; // Assuming you have a JWTUtils class
import BookingsHelper from "./helper"; // Assuming you have a BookingsHelper class
import { queueEmail } from "../../utils/emailQueue";

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

    if (booking.payment_status === "done") {
      queueEmail(
        "21rhea11jacob02@gmail.com",
        booking.user_id,
        booking.payment_id,
        booking.ticket_id
      );
    }

    return booking;
  };
}
