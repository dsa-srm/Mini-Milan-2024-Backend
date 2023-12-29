export type IBookingResponse = {
	success: boolean;
	message: string;
	messageId: string;
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

<<<<<<< HEAD
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

export type IOfflineTicketIssuedReqObj = {
	booking_id: string;
	ticket_id: string;
	payment_id: string;
};
=======
>>>>>>> cddf6baaa5ee704264d93596f5dd8dfb247c2281
