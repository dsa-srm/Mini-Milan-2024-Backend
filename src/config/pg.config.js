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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// @ts-ignore
const pg_2 = require("sqlutils/pg");
const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(String(process.env.DB_PORT)),
    ssl: {
        rejectUnauthorized: false, // Use this line if you face self-signed certificate issues
    },
    sslmode: 'require',
};
const pool = new pg_1.Pool(config);
exports.default = {
    query(text, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            text = text.replace(/\n/g, "");
            // if (isDev) console.log("to be executed query", { text });
            const res = yield pool.query(text, params);
            const duration = Date.now() - start;
            return res;
        });
    },
    format: pg_2.format,
    buildWhereFromQuery: pg_2.buildWhereFromQuery,
    transformer: pg_2.transformer,
};
