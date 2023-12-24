import ErrorHandler from "../../utils/errors.handler";

import IUserAuthValidation from "./middleware";

import {
	AuthObj,
	IUserAuthLoginReqObj,
	IUserAuthResObject,
	IUserAuthSignupReqObj,
} from "./interface";

import JWTUtils from "../../utils/jwt.utils";
import UsersAuthHelper from "./helper";

export default class UsersAuthService extends UsersAuthHelper {
  jwtHelper: JWTUtils;
  constructor() {
    super();
    this.jwtHelper = new JWTUtils();
  }

  protected loginService = async (
    reqObj: IUserAuthLoginReqObj
  ): Promise<any> => {
    const { email, password } = reqObj;

    const user = await this.getUserByEmailHelper(email);

    if (!user) {
      throw new ErrorHandler({
        status_code: 404,
        message: "User not found",
        message_code: "USER_NOT_FOUND",
      });
    }

    const isPasswordMatch = await this.comparePasswordHelper(user, password);

    if (!isPasswordMatch) {
      throw new ErrorHandler({
        status_code: 400,
        message: "Invalid Credentials",
        message_code: "INVALID_CREDENTIALS",
      });
    }

    const token = await this.jwtHelper.generateTokens(user);

    const response: AuthObj = {
      user,
      token: token.access_token,
    };

    return response;
  };

	protected signupService = async (
		reqObj: IUserAuthSignupReqObj
	): Promise<any> => {
		const { checkIsKtrStudentEmail } = new IUserAuthValidation();
		checkIsKtrStudentEmail(reqObj.email);

		const user: IUserAuthResObject = await this.signupUserHelper(reqObj);
		const token = await this.jwtHelper.generateTokens(user);

    const response: AuthObj = {
      user,
      token: token.access_token,
    };

		return response;
	};

	protected deleteUserService = async (user_id: string): Promise<void> => {
		const user = await this.getUserHelper(user_id);

		if (!user) {
			throw new ErrorHandler({
				status_code: 404,
				message: "User not found",
				message_code: "USER_NOT_FOUND",
			});
		}

		if (user.is_ticket_issued) {
			throw new ErrorHandler({
				status_code: 400,
				message: "User cannot be deleted now, offline ticket has been issued",
				message_code: "OFFLINE_TICKET_ISSUED_USER_CANNOT_BE_DELETED",
			});
		}

		await this.deleteUserHelper(user_id);
		return;
	};
}
