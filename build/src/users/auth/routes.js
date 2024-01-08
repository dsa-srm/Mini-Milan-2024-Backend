"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const middleware_1 = __importDefault(require("./middleware"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
//Creating a rate limiter
const limiter = (0, express_rate_limit_1.default)({
    //Amount of requests per window
    max: 10,
    //Window size in ms
    windowMs: 15 * 60 * 1000,
    //Message on error
    message: "Too many requests from this IP, try again in 15mins !!",
});
const router = (0, express_1.Router)();
const { execute } = new controller_1.default();
const { protect } = new middleware_1.default();
router.post("/login", limiter, execute);
router.get("/logout", execute);
router.post("/signup", limiter, execute);
router.get("/current", protect, execute);
router.get("/:id", protect, execute);
router.delete("/:id", protect, execute);
exports.default = router;
