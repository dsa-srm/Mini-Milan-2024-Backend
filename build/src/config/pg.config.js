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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// @ts-ignore
const pg_2 = require("sqlutils/pg");
const disc_logger_1 = require("../utils/disc_logger");
const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(String(process.env.DB_PORT)),
    ssl: {
        rejectUnauthorized: false, // Use this line if you face self-signed certificate issues
    },
    sslmode: "require",
};
let pool;
try {
    pool = new pg_1.Pool(config);
}
catch (err) {
    disc_logger_1.disc_logger.error({
        message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "sample error",
        error: new Error("sample error"), // This field can be included in other log functions as well
    });
}
exports.default = {
    query(text, params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const start = Date.now();
                text = text.replace(/\n/g, "");
                // if (isDev) console.log("to be executed query", { text });
                const res = yield pool.query(text, params);
                const duration = Date.now() - start;
                return res;
            }
            catch (err) {
                disc_logger_1.disc_logger.error({
                    message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "sample error",
                    error: new Error("sample error"), // This field can be included in other log functions as well
                });
                return err;
            }
        });
    },
    format: pg_2.format,
    buildWhereFromQuery: pg_2.buildWhereFromQuery,
    transformer: pg_2.transformer,
};
