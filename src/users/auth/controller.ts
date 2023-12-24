import { Request, Response } from "express";
import { errorHandler } from "../../utils/ress.error";
import { IResponse } from "../../utils/interface";
import { RequestMethods } from "../../utils/enums";
import { UsersAuthRoutes } from "./enums";
import IUserAuthValidation from "./middleware";
import { v4 } from "uuid";
import {
	AuthObj,
	IAuthResponse,
	IUserAuthLoginReqObj,
	IUserAuthSignupReqObj,
} from "./interface";
import UsersAuthService from "./services";
import ErrorHandler from "../../utils/errors.handler";

export default class UsersAuthController extends UsersAuthService {
	public execute = async (req: Request, res: Response): Promise<void> => {
		try {
			const method = req.method;
			const routeName = req.route.path.split("/")[1];
   
			let response: IResponse = {
				success: false,
			};
			let statusCode = 200;

			if (routeName === UsersAuthRoutes.LOGIN) {
				if (method === RequestMethods.POST) {
					const reqObj: IUserAuthLoginReqObj = req.body;
					const authRes: IAuthResponse = await this.loginController(reqObj);
					res.cookie("token", authRes.token, {
						httpOnly: true,
						secure: true,
						sameSite: "none",
					});
					response = authRes.user;
				}
			} else if (routeName === UsersAuthRoutes.SIGNUP) {
				if (method === RequestMethods.POST) {
					const reqObj: IUserAuthSignupReqObj = { ...req.body, id: v4() };
					const authRes: IAuthResponse = await this.signupController(reqObj);
					res.cookie("token", authRes.token, {
						httpOnly: true,
						secure: true,
						sameSite: "none",
					});
					response = authRes.user;
				}
			} else if (routeName === UsersAuthRoutes.DELETE) {
				if (method === RequestMethods.DELETE) {
					const user_id = req.params.id;
					await this.deleteUserController(user_id);
					response.message = "User deleted successfully";
					statusCode = 204;
				}
			}
			res.status(statusCode).send(response);
		} catch (error) {
			errorHandler(res, error);
		}
	};

	private loginController = async (
		reqObj: IUserAuthLoginReqObj
	): Promise<IAuthResponse> => {
		const data: AuthObj = await this.loginService(reqObj);

		return {
			user: {
				success: true,
				message: "Logged In Successfully!",
				data: data,
			},
			token: data.token,
		};
	};

	private signupController = async (
		reqObj: IUserAuthSignupReqObj
	): Promise<IAuthResponse> => {
		if (!reqObj.email || !reqObj.phone_number) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Email or Phone Number is required.",
				message_code: "EMAIL_OR_PHONE_NUMBER_REQUIRED",
			});
		} else {
			const { validateEmailAndPhoneNumber } = new IUserAuthValidation();
			validateEmailAndPhoneNumber(reqObj.email, reqObj.phone_number);
		}

		const data: AuthObj = await this.signupService(reqObj);
		return {
			user: {
				success: true,
				message: "Signed Up Successfully!",
				data: data,
			},
			token: data.token,
		};
	};

	private deleteUserController = async (user_id: string): Promise<void> => {
		await this.deleteUserService(user_id);
		return;
	};
}
