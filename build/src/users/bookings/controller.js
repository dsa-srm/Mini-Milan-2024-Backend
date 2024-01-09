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
const uuid_1 = require("uuid");
const services_1 = __importDefault(require("./services")); // Assuming you have a BookingsService class
const enums_2 = require("./enums");
const errors_handler_1 = __importDefault(require("../../utils/errors.handler"));
class BookingsController extends services_1.default {
    constructor() {
        super(...arguments);
        this.execute = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const method = req.method;
                let response = {
                    success: false,
                };
                let statusCode = 200;
                if (req.path === enums_2.bookingRoutes.POSTBOOKING) {
                    if (method === enums_1.RequestMethods.GET) {
                        const ticketType = req.query.ticketType;
                        const userId = req.query.userId;
                        const paymentId = req.query.paymentId;
                        const ticketId = req.query.ticketId;
                        const paymentStatus = req.query.paymentStatus;
                        const ticketStatus = req.query.ticketStatus;
                        if (!ticketType || !userId || !paymentStatus || !ticketStatus) {
                            throw new errors_handler_1.default({
                                status_code: 400,
                                message: "Invalid Query Parameters",
                                message_code: "INVALID_QUERY_PARAMS",
                            });
                        }
                        const reqObj = {
                            id: (0, uuid_1.v4)(),
                            ticket_type: ticketType,
                            user_id: userId,
                            payment_id: paymentId,
                            ticket_id: ticketId,
                            payment_status: paymentStatus,
                            ticket_status: ticketStatus,
                            offline_ticket_issued: false,
                            created_at: new Date(),
                            updated_at: new Date(),
                        };
                        const bookingResponse = yield this.createBookingController(reqObj);
                        // Additional logic if needed
                        response = bookingResponse;
                    }
                }
                else if (req.path === enums_2.bookingRoutes.GETLIVECOUNT) {
                    if (method === enums_1.RequestMethods.GET) {
                        const liveCountResponse = yield this.getLiveCountController();
                        response = liveCountResponse;
                    }
                }
                else if (req.path === enums_2.bookingRoutes.UPDATETICKETISUED) {
                    if (method === enums_1.RequestMethods.PATCH) {
                        const { user_id, ticket_id, payment_id } = req.body;
                        const reqObj = {
                            user_id: (_a = user_id === null || user_id === void 0 ? void 0 : user_id.toString()) !== null && _a !== void 0 ? _a : "",
                            ticket_id: ticket_id,
                            payment_id: payment_id,
                        };
                        const updateResponse = yield this.updateTicketIssued(reqObj);
                        response = updateResponse;
                    }
                }
                else if (req.path === enums_2.bookingRoutes.FETCHBOOKING) {
                    if (method === enums_1.RequestMethods.GET) {
                        const email = req.body.email;
                        if (!email) {
                            throw new errors_handler_1.default({
                                status_code: 400,
                                message: "Email is required",
                                message_code: "EMAIL_REQUIRED",
                            });
                        }
                        const bookingResponse = yield this.getBookingController(email);
                        response = bookingResponse;
                    }
                }
                res.status(statusCode).send(response);
            }
            catch (error) {
                (0, ress_error_1.errorHandler)(res, error);
            }
        });
        this.createBookingController = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.createBookingService(reqObj);
            return {
                success: true,
                message: "Booking Entered Successfully!",
                data: data,
                message_code: "BOOKING_ENTERED_SUCCESSFULLY",
            };
        });
        this.getLiveCountController = () => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getLiveTicketCountService();
            return {
                success: true,
                message: "Total Live Count Fetched",
                data: data,
                message_code: "TOTAL_LIVE_COUNT_FETCHED",
            };
        });
        this.getBookingController = (email) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getBookingService(email);
            return {
                success: true,
                message: "Booking Fetched Successfully!",
                data: data,
                message_code: "BOOKING_FETCHED_SUCCESSFULLY",
            };
        });
        this.updateTicketIssued = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.updateTicketIssuedService(reqObj);
            return {
                success: true,
                message: "Ticket Issued Updated Successfully",
                data: data,
                message_code: "TICKET_ISSUED_UPDATED_SUCCESSFULLY",
            };
        });
    }
}
exports.default = BookingsController;
