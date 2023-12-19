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
const pg_config_1 = __importDefault(require("../../config/pg.config"));
const errors_handler_1 = __importDefault(require("../../utils/errors.handler"));
class BookingsDB {
    constructor() {
        this.getBooking = (bookingId) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM bookings WHERE id = $1 LIMIT 1`;
            const { rows } = yield pg_config_1.default.query(query, [bookingId]);
            return rows[0];
        });
        this.createBooking = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            reqObj.created_at = new Date();
            reqObj.updated_at = new Date();
            const query = pg_config_1.default.format(`INSERT INTO bookings ? RETURNING *`, reqObj);
            try {
                const { rows } = yield pg_config_1.default.query(query);
                return rows[0];
            }
            catch (err) {
                throw new errors_handler_1.default({
                    status_code: 400,
                    message: "Something went wrong while creating booking",
                    message_code: "ENTER_VALID_DETAILS",
                });
            }
        });
        // Additional database methods specific to booking functionality can be added here
    }
}
exports.default = BookingsDB;
