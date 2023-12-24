"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.errorHandler = void 0;
const logger_1 = __importStar(require("./logger"));
const errors_handler_1 = __importDefault(require("./errors.handler"));
const errorHandler = (res, error) => {
    var _a;
    (0, logger_1.default)(`Request failed with: ${error ? (_a = error.message) !== null && _a !== void 0 ? _a : JSON.stringify(error) : "No error"}`, logger_1.LogTypes.CUSTOM_OBJ);
    if (error instanceof errors_handler_1.default) {
        return res.status(error.status_code).send({
            success: false,
            message: error.message,
            data: error.data,
            message_code: error.message_code,
        });
    }
    return res.status(500).send({
        success: false,
        message: "Hold Tight! Our Engineers Are on the Case",
    });
};
exports.errorHandler = errorHandler;
