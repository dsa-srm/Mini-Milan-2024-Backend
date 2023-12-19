import bcrypt from "bcryptjs";
import { IUserAuthResObject, IUserAuthSignupReqObj } from "./interface";
import ErrorHandler from "../../utils/errors.handler";
import UsersAuthDB from "./db";

export default class UsersAuthHelper extends UsersAuthDB {
	protected getUserByEmailHelper = async (
		email: string
	): Promise<IUserAuthResObject> => {
		const user = await this.getUser(email);
		return user;
	};

	protected comparePasswordHelper = async (
		user: any,
		password: string
	): Promise<boolean> => {
		return await bcrypt.compare(password, user.password);
	};

	protected signupUserHelper = async (
		reqObj: IUserAuthSignupReqObj
	): Promise<IUserAuthResObject> => {
		reqObj.created_at = new Date();
		reqObj.updated_at = new Date();

		const newReqObj: IUserAuthSignupReqObj = {
			...reqObj,
			password: await bcrypt.hash(reqObj.password, 12),
		};
		const user = await this.createUser(newReqObj);

		if (!user) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Something went wrong while creating user",
				message_code: "SOMETHING_WENT_WRONG",
			});
		}

		return user;
	};
}
