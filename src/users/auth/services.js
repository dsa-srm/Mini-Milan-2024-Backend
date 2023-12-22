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
const errors_handler_1 = __importDefault(require("../../utils/errors.handler"));
const middleware_1 = __importDefault(require("./middleware"));
const jwt_utils_1 = __importDefault(require("../../utils/jwt.utils"));
const helper_1 = __importDefault(require("./helper"));
class UsersAuthService extends helper_1.default {
    constructor() {
        super();
        this.loginService = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = reqObj;
            const user = yield this.getUserByEmailHelper(email);
            if (!user) {
                throw new errors_handler_1.default({
                    status_code: 404,
                    message: "User not found",
                    message_code: "USER_NOT_FOUND",
                });
            }
            const isPasswordMatch = yield this.comparePasswordHelper(user, password);
            if (!isPasswordMatch) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Invalid Credentials",
                    message_code: "INVALID_CREDENTIALS",
                });
            }
            const token = yield this.jwtHelper.generateTokens(user);
            const response = {
                user,
                token: token.access_token,
            };
            return response;
        });
        this.signupService = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const { checkIsKtrStudentEmail } = new middleware_1.default();
            checkIsKtrStudentEmail(reqObj.email);
            const user = yield this.signupUserHelper(reqObj);
            const token = yield this.jwtHelper.generateTokens(user);
            const response = {
                user,
                token: token.access_token,
            };
            return response;
        });
        this.deleteUserService = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserHelper(user_id);
            if (!user) {
                throw new errors_handler_1.default({
                    status_code: 404,
                    message: "User not found",
                    message_code: "USER_NOT_FOUND",
                });
            }
            if (user.is_ticket_issued) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "User cannot be deleted now, offline ticket has been issued",
                    message_code: "OFFLINE_TICKET_ISSUED_USER_CANNOT_BE_DELETED",
                });
            }
            yield this.deleteUserHelper(user_id);
            return;
        });
        this.jwtHelper = new jwt_utils_1.default();
    }
}
exports.default = UsersAuthService;
