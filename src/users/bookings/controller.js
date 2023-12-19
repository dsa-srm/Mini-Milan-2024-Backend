"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ress_error_1 = require("../../utils/ress.error");
// import { UsersAuthRoutes } from "./enums";
class UsersAuthController {
    constructor() {
        this.execute = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const method = req.method;
                const routeName = req.route.path.split("/")[1];
                const response = {
                    success: false,
                };
                let statusCode = 200;
                res.status(statusCode).send(response);
            }
            catch (error) {
                (0, ress_error_1.errorHandler)(res, error);
            }
        });
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
}
exports.default = UsersAuthController;
