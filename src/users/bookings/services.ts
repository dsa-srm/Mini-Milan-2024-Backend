import { v4 } from "uuid";
import ErrorHandler from "../../utils/errors.handler";
import { ICreateBookingReqObj, IUpdateTicketReqObj } from "./interface";
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
    const sqsResponse = await this.insertBookingInSqs(reqObj);
	const response ={
		messageId: sqsResponse.MessageId,
	}
    return response;
  };

  protected getLiveTicketCountService = async (): Promise<any> => {
    
	const countResponse:any = await this.getTotalBookingCount();
  const totalTicketCount = 10000-countResponse.count;
	const response={
		total_count: totalTicketCount,
	}
	return response;


  };
  protected updateTicketIssuedService = async (reqObj:IUpdateTicketReqObj): Promise<any> => {
    
	const response = await this.updateOfflineTicketIssuedHelper(reqObj);
	const responseObj={
		data: response,
	}
	return responseObj;


  };
}
