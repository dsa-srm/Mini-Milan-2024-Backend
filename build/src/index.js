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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import * as moment from "moment-timezone";
const moment_1 = __importDefault(require("moment"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importStar(require("./utils/logger"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const desiredTimeZone = "Asia/Kolkata"; // India Standard Time (GMT+5:30)
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://9c58mm.csb.app",
        "https://mini.srmmilan.org",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
const routes_1 = __importDefault(require("./users/auth/routes"));
const routes_2 = __importDefault(require("./users/bookings/routes"));
app.use("/api/users", routes_1.default);
app.use("/api/bookings", routes_2.default);
app.get("/", (req, res) => {
    const date = (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss");
    res.status(200).send({
        message: "Server is running",
        status_code: 200,
        entry_time: date,
    });
});
app.use("*", (req, res) => {
    res.status(404).send({
        message: "Route not Found",
        status_code: 404,
    });
});
app.listen(process.env.PORT || 4000, () => {
    var _a;
    (0, logger_1.default)(`Server is running on port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000}`, logger_1.LogTypes.LOGS);
});
