"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
const { execute } = new controller_1.default();
router.post("/login", execute);
router.post("/signup", execute);
router.delete("/:id", execute);
exports.default = router;
