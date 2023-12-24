import { Request, Response } from "express";
import { errorHandler } from "../../utils/ress.error";
import { IResponse } from "../../utils/interface";
import { RequestMethods } from "../../utils/enums";
import { UsersAuthRoutes } from "./enums";
import { v4 } from "uuid";
import {
	AuthObj,
	IAuthResponse,
	IUserAuthLoginReqObj,
	IUserAuthSignupReqObj,
} from "./interface";
import UsersAuthService from "./services";

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
					});
					response = authRes.user;
				}
			} else if (routeName === UsersAuthRoutes.SIGNUP) {
				if (method === RequestMethods.POST) {
					const reqObj: IUserAuthSignupReqObj = { ...req.body, id: v4() };
					const authRes: IAuthResponse = await this.signupController(reqObj);
					res.cookie("token", authRes.token, {
						httpOnly: true,
					});
					response = authRes.user;
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
}
