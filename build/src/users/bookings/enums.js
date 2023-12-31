"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.TicketStatus = exports.bookingRoutes = void 0;
var bookingRoutes;
(function (bookingRoutes) {
    bookingRoutes["POSTBOOKING"] = "/";
    bookingRoutes["GETLIVECOUNT"] = "/livecount";
    bookingRoutes["UPDATETICKETISUED"] = "/updateticketissued";
})(bookingRoutes || (exports.bookingRoutes = bookingRoutes = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["PENDING"] = "pending";
    TicketStatus["SUCCESS"] = "success";
    TicketStatus["FAILED"] = "failed";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["SUCCESS"] = "success";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
