"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const logger_1 = __importStar(require("../../utils/logger"));
class BookingsController extends services_1.default {
    constructor() {
        super(...arguments);
        this.execute = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryParams = Object.assign({}, req.query);
                const reqData = JSON.parse(JSON.stringify(queryParams));
                const method = req.method;
                const routeName = req.route.path.split("/")[1];
                let response = {
                    success: false,
                };
                let statusCode = 200;
                if (method === enums_1.RequestMethods.POST) {
                    const reqObj = Object.assign(Object.assign({}, reqData), { offline_ticket_issued: false, id: (0, uuid_1.v4)() });
                    const bookingRes = yield this.createBookingController(reqObj);
                    // Additional logic if needed
                    response = bookingRes;
                }
                else if (method === enums_1.RequestMethods.PATCH) {
                    const booking_id = req.params.id;
                    const reqObj = Object.assign(Object.assign({}, reqData), { booking_id });
                    const bookingRes = yield this.issueOfflineTicketController(reqObj);
                    // Additional logic if needed
                    response = bookingRes;
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
                message: "Booking Created Successfully!",
                booking: data,
            };
        });
        this.issueOfflineTicketController = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            (0, logger_1.default)(reqObj, logger_1.LogTypes.LOGS);
            const data = yield this.issueOfflineTicketService(reqObj);
            return {
                success: true,
                message: "Offline Ticket Issued Successfully!",
                booking: data,
            };
        });
    }
}
exports.default = BookingsController;
