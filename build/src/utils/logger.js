"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogTypes = void 0;
const pino_1 = require("pino");
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const stream = (0, pino_pretty_1.default)({
    colorize: true,
    translateTime: "yyyy-mm-dd HH:MM:ss",
});
const init = () => (0, pino_1.pino)(stream);
var LogTypes;
(function (LogTypes) {
    LogTypes["LOGS"] = "logs";
    LogTypes["CUSTOM_OBJ"] = "customObj";
})(LogTypes || (exports.LogTypes = LogTypes = {}));
const Logs = (msg) => init().info(msg);
const customLogHandler = (obj) => init().child(obj);
const logger = (msg, func) => {
    if (LogTypes.LOGS)
        return Logs(msg);
    return customLogHandler(msg);
};
exports.default = logger;
