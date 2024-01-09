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
const client_sqs_1 = require("@aws-sdk/client-sqs");
const dotenv_1 = __importDefault(require("dotenv"));
const db_2 = require("../auth/db");
dotenv_1.default.config();
const sqsClient = new client_sqs_1.SQSClient({
    region: process.env.AWS_REGION,
});
class BookingsHelper extends db_1.default {
    constructor() {
        super(...arguments);
        this.insertBookingInSqs = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const UserEmail = yield this.UserEmail(reqObj.user_id);
            if (!UserEmail) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "User not found, Send them to tech team!!",
                    message_code: "USER_NOT_FOUND_IN_CREATE_BOOKING",
                    is_loggable: true,
                    user: reqObj.user_id,
                });
            }
            const messageData = {
                id: reqObj.id,
                ticket_type: reqObj.ticket_type,
                user_id: reqObj.user_id,
                email: UserEmail.email,
                payment_id: reqObj.payment_id,
                ticket_id: reqObj.ticket_id,
                payment_status: reqObj.payment_status,
                ticket_status: reqObj.ticket_status,
                offline_ticket_issued: reqObj.offline_ticket_issued,
                updated_at: reqObj.updated_at,
                created_at: reqObj.created_at,
            };
            if (!process.env.SQS_QUEUE_URL)
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "SQS_QUEUE_URL not found",
                    message_code: "SQS_URL_NOT_FOUND",
                });
            const queueUrl = process.env.SQS_QUEUE_URL ||
                "https://sqs.ap-south-1.amazonaws.com/322653267300/booking-post.fifo";
            const messageGroupId = "booking-post";
            const sendMessageCommand = new client_sqs_1.SendMessageCommand({
                QueueUrl: queueUrl,
                MessageBody: JSON.stringify(messageData),
                MessageGroupId: messageGroupId,
            });
            const result = yield sqsClient.send(sendMessageCommand);
            console.log("Message sent to SQS:", result.MessageId);
            return result;
        });
        this.updateOfflineTicketIssuedHelper = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const isUserExists = yield this.checkUserExists(reqObj.user_id);
            if (!isUserExists) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "User not found, Send them to tech team!!",
                    message_code: "USER_NOT_FOUND",
                    is_loggable: true,
                    user: reqObj.user_id,
                });
            }
            const checkIsAlreadyIssued = yield this.checkTicketIssued(reqObj.ticket_id);
            if (checkIsAlreadyIssued.offline_ticket_issued) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Ticket already issued",
                    message_code: "TICKET_ALREADY_ISSUED",
                });
            }
            const updatedBooking = yield this.updateOfflineTicketIssued(reqObj.user_id, reqObj.ticket_id, reqObj.payment_id);
            return updatedBooking;
        });
        this.getBookingByEmailHelper = (email) => __awaiter(this, void 0, void 0, function* () {
            const authObj = new db_2.ExtendedUserServiceDb();
            const user = yield authObj.getUser_Email(email);
            if (!user) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "User not found",
                    message_code: "USER_NOT_FOUND",
                });
            }
            const booking = yield this.getUserBooking(user.id);
            if (!booking) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Booking not found",
                    message_code: "BOOKING_NOT_FOUND",
                });
            }
            return booking;
        });
    }
}
exports.default = BookingsHelper;
