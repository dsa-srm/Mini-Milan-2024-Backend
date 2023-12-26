"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(errorObj) {
        super();
        this.status_code = errorObj.status_code;
        this.message = errorObj.message;
        this.data = errorObj.data;
        this.message_code = errorObj.message_code;
    }
    toString() {
        return {
            message: this.message,
            status_code: this.status_code,
            data: this.data,
            message_code: this.message_code
        };
    }
}
exports.default = ErrorHandler;
