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
class UsersAuthDB {
    constructor() {
        this.getUser = (email) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
            const { rows } = yield pg_config_1.default.query(query, [email]);
            return rows[0];
        });
        this.createUser = (reqObj) => __awaiter(this, void 0, void 0, function* () {
            const query = pg_config_1.default.format(`INSERT INTO users ? RETURNING *`, reqObj);
            const { rows } = yield pg_config_1.default.query(query);
            return rows[0];
        });
        this.isExistingUser = (email, phone_number) => __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE email = $1 OR phone_number = $2 LIMIT 1`;
            const { rows } = yield pg_config_1.default.query(query, [email, phone_number]);
            return rows[0];
        });
    }
}
exports.default = UsersAuthDB;
