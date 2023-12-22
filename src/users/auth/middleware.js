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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const ress_error_1 = require("../../utils/ress.error");
const path_1 = __importDefault(require("path"));
const errors_handler_1 = __importDefault(require("../../utils/errors.handler"));
const joi_1 = __importDefault(require("joi"));
class IUserAuthValidation {
    constructor() {
        this.validateEmailAndPhoneNumber = (email, phone_number) => {
            const emailSchema = joi_1.default.string().email({
                minDomainSegments: 2,
                tlds: { allow: true },
            });
            const phoneSchema = joi_1.default.string().pattern(/^[0-9]{10}$/);
            const emailValidationResult = emailSchema.validate(email);
            const phoneValidationResult = phoneSchema.validate(phone_number.toString());
            if (emailValidationResult.error) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Invalid email format.",
                    message_code: "INVALID_EMAIL_FORMAT",
                });
            }
            if (phoneValidationResult.error) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Invalid phone number format.",
                    message_code: "INVALID_PHONE_NUMBER_FORMAT",
                });
            }
        };
        this.jwtVerifyPromisified = (token, secret) => {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, secret, {}, (err, payload) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(payload);
                    }
                });
            });
        };
        this.protect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let token;
                // 1. Getting the token & Checking if it is there with the header??
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith("Bearer")) {
                    token = req.headers.authorization.split(" ")[1];
                }
                else if (req.cookies.token) {
                    // To check for the jwt in cookie
                    token = req.cookies.token;
                }
                else {
                    throw new errors_handler_1.default({
                        status_code: 400,
                        message: "You are not logged in! Please log in to get access.",
                        message_code: "NOT_LOGGED_IN",
                    });
                }
                const JWT_SECRET = fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../../keys/jwtRS256.key"));
                // 2. Verification of Token
                const payload = yield this.jwtVerifyPromisified(token, JWT_SECRET);
                if (!payload) {
                    throw new errors_handler_1.default({
                        status_code: 400,
                        message: "You are not logged in! Please log in to get access.",
                        message_code: "NOT_LOGGED_IN",
                    });
                }
                next();
            }
            catch (error) {
                (0, ress_error_1.errorHandler)(res, error);
            }
        });
        this.checkIsKtrStudentEmail = (email) => {
            console.log("Been here 🔥🔥🔥🔥");
            const ktr_email_schema = joi_1.default.string().pattern(/^[a-zA-Z]{2}[0-9]{4}@srmist.edu.in$/);
            const ktr_email_validation_result = ktr_email_schema.validate(email);
            if (ktr_email_validation_result.error) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Invalid KTR Student email format.",
                    message_code: "INVALID_KTR_STUDENT_EMAIL_FORMAT",
                });
            }
        };
    }
}
exports.default = IUserAuthValidation;
// 1.soft delete
// 2.is ktr-student
// 3.regex
// 4.Error Discord
// 5.gender
