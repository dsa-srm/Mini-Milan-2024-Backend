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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ress_error_1 = require("../../utils/ress.error");
const enums_1 = require("../../utils/enums");
const enums_2 = require("./enums");
const middleware_1 = __importDefault(require("./middleware"));
const uuid_1 = require("uuid");
const services_1 = __importDefault(require("./services"));
const errors_handler_1 = __importDefault(require("../../utils/errors.handler"));
class UsersAuthController extends services_1.default {
    constructor() {
        super(...arguments);
        this.execute = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const method = req.method;
                const routeName = req.route.path.split("/")[1];
                let response = {
                    success: false,
                };
                let statusCode = 200;
                if (routeName === enums_2.UsersAuthRoutes.LOGIN) {
                    if (method === enums_1.RequestMethods.POST) {
                        const reqObj = req.body;
                        const authRes = yield this.loginController(reqObj);
                        res.cookie("token", authRes.token, {
                            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                            httpOnly: false,
                            secure: true,
                            sameSite: "none",
                        });
                        response = authRes.user;
                    }
                }
                else if (routeName === enums_2.UsersAuthRoutes.SIGNUP) {
                    if (method === enums_1.RequestMethods.POST) {
                        const reqObj = Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)() });
                        const authRes = yield this.signupController(reqObj);
                        res.cookie("token", authRes.token, {
                            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                            httpOnly: false,
                            secure: true,
                            sameSite: "none",
                        });
                        response = authRes.user;
                    }
                }
                else if (method === enums_1.RequestMethods.DELETE) {
                    const user_id = req.params.id;
                    yield this.deleteUserController(user_id);
                    response.message = "User deleted successfully";
                    statusCode = 204;
                }
                else if (method === enums_1.RequestMethods.GET) {
                    if (routeName === enums_2.UsersAuthRoutes.CURRENT) {
                        const user_id = req.body.current_user.id;
                        response = yield this.getUserController(user_id);
                    }
                    else {
                        const user_id = req.params.id;
                        response = yield this.getUserController(user_id);
                    }
                }
                res.status(statusCode).send(response);
            }
            catch (error) {
                (0, ress_error_1.errorHandler)(res, error);
            }
        });
        this.loginController = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loginService(reqObj);
            return {
                user: {
                    success: true,
                    message: "Logged In Successfully!",
                    data: data,
                },
                token: data.token,
            };
        });
        this.signupController = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            if (!reqObj.email || !reqObj.phone_number) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Email or Phone Number is required.",
                    message_code: "EMAIL_OR_PHONE_NUMBER_REQUIRED",
                });
            }
            else {
                const { validateEmailAndPhoneNumber } = new middleware_1.default();
                validateEmailAndPhoneNumber(reqObj.email, reqObj.phone_number);
            }
            const data = yield this.signupService(reqObj);
            return {
                user: {
                    success: true,
                    message: "Signed Up Successfully!",
                    data: data,
                },
                token: data.token,
            };
        });
        this.deleteUserController = (user_id) => __awaiter(this, void 0, void 0, function* () {
            yield this.deleteUserService(user_id);
            return;
        });
        this.getUserController = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserService(user_id);
            return {
                success: true,
                message: "User fetched successfully",
                data: {
                    user: user,
                },
            };
        });
    }
}
exports.default = UsersAuthController;
