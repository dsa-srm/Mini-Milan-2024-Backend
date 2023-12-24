export type IUserAuthLoginReqObj = {
	email: string;
	password: string;
};

export type IUserAuthSignupReqObj = {
	id: string;
	name: string;
	email: string;
	password: string;
	reg_number: string;
	is_srm_student: boolean;
	phone_number: number;
	is_ticket_issued: boolean;
	updated_at: Date;
	created_at: Date;
};

export type IUserAuthResObject = {
	id: string;
	name: string;
	email: string;
	reg_number: string;
	is_srm_student: boolean;
	phone_number: number;
	is_ticket_issued: boolean;
	updated_at: Date;
	created_at: Date;
};
export type IResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T | null;
    message_code?: string;
  };
  
export type IAuthResponse = {
	user: IResponse; //error
	token: string;
};

export type AuthObj = {
	user: IUserAuthResObject;  //error
	token: string;
};
