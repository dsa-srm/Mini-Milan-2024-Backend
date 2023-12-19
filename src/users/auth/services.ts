import { v4 } from "uuid";
import ErrorHandler from "../../utils/errors.handler";

import {
  AuthObj,
  IAuthResponse,
  IUserAuthLoginReqObj,
  IUserAuthResObject,
  IUserAuthSignupReqObj,
} from "./interface";
import moment from "moment";
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
    const user: IUserAuthResObject = await this.signupUserHelper(reqObj);
    const token = await this.jwtHelper.generateTokens(user);

    const response: AuthObj = {
      user,
      token: token.access_token,
    };

    return response;
  };
}
