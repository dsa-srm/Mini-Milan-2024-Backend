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
class BookingsDB {
    constructor() {
        this.getUserBooking = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM bookings WHERE User_id = $1 LIMIT 1;`;
            const { rows } = yield pg_config_1.default.query(query, [user_id]);
            return rows[0];
        });
        this.getBooking = (bookingId) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM bookings WHERE id = $1 LIMIT 1;`;
            const { rows } = yield pg_config_1.default.query(query, [bookingId]);
            return rows[0];
        });
        this.getTotalBookingCount = () => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT COUNT(*) FROM bookings;`;
            const { rows } = yield pg_config_1.default.query(query);
            return rows[0];
        });
        this.createBooking = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const query = pg_config_1.default.format(`INSERT INTO bookings ? RETURNING *`, reqObj);
            const { rows } = yield pg_config_1.default.query(query);
            return rows[0];
        });
        // protected checkUserExists = async (user_id: string): Promise<boolean> => {
        // const query = `SELECT EXISTS(SELECT 1 FROM bookings WHERE user_id = $1);`;
        // const { rows } = await db.query(query, [user_id]);
        // return rows[0] as unknown as any;
        // }
        this.checkTicketIssued = (ticket_id) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT offline_ticket_issued FROM bookings WHERE ticket_id = $1 ;`;
            const { rows } = yield pg_config_1.default.query(query, [ticket_id]);
            return rows[0];
        });
        this.UserEmail = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT email FROM users WHERE id = $1;`;
            const { rows } = yield pg_config_1.default.query(query, [user_id]);
            return rows[0];
        });
        this.checkUserExists = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT EXISTS(
		SELECT 1 FROM users WHERE id = $1 AND is_deleted = false
		);`;
            const { rows } = yield pg_config_1.default.query(query, [user_id]);
            return rows[0];
        });
        this.updateOfflineTicketIssued = (user_id, ticket_id, payment_id) => __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE bookings AS b
    SET offline_ticket_issued = true, updated_at = current_timestamp
    FROM users AS u
    WHERE b.user_id = u.id
      AND b.ticket_id = $2
      AND b.payment_id = $3
      AND b.user_id = $1
    RETURNING b.*, u.name, u.reg_number, u.email 
    ;`;
            const { rows } = yield pg_config_1.default.query(query, [user_id, ticket_id, payment_id]);
            return rows[0];
        });
    }
}
exports.default = BookingsDB;
// Assuming you have a BookingsService class with methods for handling bookings
