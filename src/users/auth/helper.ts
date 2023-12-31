import bcrypt from "bcryptjs";
import { IUserAuthResObject, IUserAuthSignupReqObj } from "./interface";
import ErrorHandler from "../../utils/errors.handler";
import UsersAuthDB from "./db";

export default class UsersAuthHelper extends UsersAuthDB {
	protected getUserByEmailHelper = async (
		email: string
	): Promise<IUserAuthResObject> => {
		const user = await this.getUserByEmail(email);
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
		const isExistingUser = await this.isExistingUser(
			reqObj.email,
			reqObj.phone_number,
			reqObj.reg_number
		);

		if (isExistingUser) {
			if (isExistingUser.is_deleted) {
				const user = await this.reviveUser(isExistingUser.id, {
					...reqObj,
					password: await bcrypt.hash(reqObj.password, 12),
					created_at: new Date(),
					updated_at: new Date(),
				});
				return user;
			} else {
				throw new ErrorHandler({
					status_code: 404,
					message: "User already exists",
					message_code: "USER_ALREADY_EXISTS",
				});
			}
		}

		const user = await this.createUser({
			...reqObj,
			password: await bcrypt.hash(reqObj.password, 12),
			created_at: new Date(),
			updated_at: new Date(),
		});

		if (!user) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Something went wrong while creating user",
				message_code: "SOMETHING_WENT_WRONG",
			});
		}

		return user;
	};

	protected getUserHelper = async (id: string): Promise<IUserAuthResObject> => {
		const user = await this.getUser(id);
		return user;
	};

	protected deleteUserHelper = async (user_id: string): Promise<void> => {
		await this.deleteUser(user_id);
		return;
	};
}
