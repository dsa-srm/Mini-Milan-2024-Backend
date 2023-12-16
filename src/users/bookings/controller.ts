import { Request, Response } from "express";
import { errorHandler } from "../../utils/ress.error";
import { IResponse } from "../../utils/interface";
import { RequestMethods } from "../../utils/enums";
// import { UsersAuthRoutes } from "./enums";

export default class UsersAuthController   {
  public execute = async (req: Request, res: Response): Promise<void> => {
    try {
      const method = req.method;
      const routeName = req.route.path.split("/")[1];

      const response: IResponse = {
          success: false,
        }
      let statusCode = 200;
    
   

      res.status(statusCode).send(response);
    } catch (error) {
      console.log("error: ", error);
      errorHandler(res, error);
    }
  };

  // private loginController = async (
  //   reqObj: IUserAuthLoginReqObj
  // ): Promise<IResponse> => {
  //   await this.loginService(reqObj);
  //   return {
  //     success: true,
  //     message: "OTP Sent Successfully!",
  //   };
  // };
}
