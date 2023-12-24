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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_handler_1 = __importDefault(require("../../utils/errors.handler"));
const db_1 = __importDefault(require("./db"));
class UsersAuthHelper extends db_1.default {
    constructor() {
        super(...arguments);
        this.getUserByEmailHelper = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(email);
            return user;
        });
        this.comparePasswordHelper = (user, password) => __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compare(password, user.password);
        });
        this.signupUserHelper = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const isExistingUser = yield this.isExistingUser(reqObj.email, reqObj.phone_number);
            if (isExistingUser && !isExistingUser.is_deleted) {
                throw new errors_handler_1.default({
                    status_code: 409,
                    message: "User already exists",
                    message_code: "USER_ALREADY_EXISTS",
                });
            }
            reqObj.created_at = new Date();
            reqObj.updated_at = new Date();
            const newReqObj = Object.assign(Object.assign({}, reqObj), { password: yield bcryptjs_1.default.hash(reqObj.password, 12) });
            const user = yield this.createUser(newReqObj);
            if (!user) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Something went wrong while creating user",
                    message_code: "SOMETHING_WENT_WRONG",
                });
            }
            return user;
        });
        this.getUserHelper = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(id);
            return user;
        });
        this.deleteUserHelper = (user_id) => __awaiter(this, void 0, void 0, function* () {
            yield this.deleteUser(user_id);
            return;
        });
    }
}
exports.default = UsersAuthHelper;
