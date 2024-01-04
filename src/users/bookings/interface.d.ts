export type IBookingPostResponse = {
	success: boolean;
	message: string;
	message_id: string;
};
export type ILiveCountResponse = {
	success: boolean;
	message: string;
	total_count: Number;
};

export type IBookingGetResObj = {
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

export type IUpdateTicketReqObj = {
	user_id: string;
	payment_id: string;
	ticket_id: string;
};
