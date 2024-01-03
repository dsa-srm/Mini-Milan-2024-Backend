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
const jwt_utils_1 = __importDefault(require("../../utils/jwt.utils")); // Assuming you have a JWTUtils class
const helper_1 = __importDefault(require("./helper")); // Assuming you have a BookingsHelper class
class BookingsService extends helper_1.default {
    constructor() {
        super();
        this.createBookingService = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const sqsResponse = yield this.insertBookingInSqs(reqObj);
            const response = {
                messageId: sqsResponse.MessageId,
            };
            return response;
        });
        this.updateTicketIssuedService = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.updateOfflineTicketIssuedHelper(reqObj);
            const responseObj = {
                data: response,
            };
            return responseObj;
        });
        this.jwtHelper = new jwt_utils_1.default();
    }
}
exports.default = BookingsService;
