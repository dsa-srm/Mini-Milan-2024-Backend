"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogTypes = void 0;
const pino_1 = require("pino");
const init = () => (0, pino_1.pino)();
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
