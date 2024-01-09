export default class ErrorHandler extends Error {
	status_code: number;
	message: string;
	data: any;
	message_code: string;
	is_loggable?: boolean;
	user?: any;

	constructor(errorObj: {
		status_code: number;
		message: string;
		data?: any;
		message_code: string;
		is_loggable?: boolean;
		user?: any;
	}) {
		super();
		this.status_code = errorObj.status_code;
		this.message = errorObj.message;
		this.data = errorObj.data;
		this.message_code = errorObj.message_code;
		this.is_loggable = errorObj.is_loggable;
		this.user = errorObj.user;
	}

	toString() {
		return {
			message: this.message,
			status_code: this.status_code,
			data: this.data,
			message_code: this.message_code,
			is_loggable: this.is_loggable,
		};
	}
}
