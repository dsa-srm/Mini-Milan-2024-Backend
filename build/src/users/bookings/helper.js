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
const db_1 = __importDefault(require("./db"));
class BookingsHelper extends db_1.default {
    constructor() {
        super(...arguments);
        this.createBookingHelper = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            reqObj.created_at = new Date();
            reqObj.updated_at = new Date();
            // Additional validation and business logic can be added here
            const booking = yield this.createBooking(reqObj);
            if (!booking) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Something went wrong while creating booking",
                    message_code: "SOMETHING_WENT_WRONG",
                });
            }
            return booking;
        });
        this.issueOfflineTicketHelper = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield this.issueOfflineTicket(reqObj);
                if (!booking) {
                    throw new errors_handler_1.default({
                        status_code: 400,
                        message: "Something went wrong while issuing offline ticket",
                        message_code: "SOMETHING_WENT_WRONG",
                    });
                }
                return booking;
            }
            catch (err) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Booking not found",
                    message_code: "SOMETHING_WENT_WRONG",
                });
            }
        });
        // Additional helper methods specific to booking functionality can be added here
    }
}
exports.default = BookingsHelper;
