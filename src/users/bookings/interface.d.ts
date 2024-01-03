export type IBookingResponse = {
	success: boolean;
	message: string;
	booking: BookingObj;
};

export type ICreateBookingReqObj = {
	id: string;
	ticket_type: string;
	user_id: string;
	payment_id: string;
	ticket_id: string;
	payment_status: string;
	ticket_status: string;
	offline_ticket_issued: boolean;
	updated_at: Date;
	created_at: Date;
};

export type BookingObj = {
	id: string;
	ticket_type: string;
	user_id: string;
	payment_id: string;
	ticket_id: string;
	payment_status: string;
	ticket_status: string;
	offline_ticket_issued: boolean;
	updated_at: Date;
	created_at: Date;
};

export type IBooking = {
	id: string;
	
	
  };
  
  export type IResponse<T = any> = {
	success: boolean;
	message?: string;
	data?: T | null;
  }