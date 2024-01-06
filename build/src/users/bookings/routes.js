"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../auth/middleware"));
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
const { protect } = new middleware_1.default();
const { execute } = new controller_1.default();
// router.use(protect);
router.route("/").get(execute);
<<<<<<< HEAD
router.route("/livecount").get(execute);
=======
<<<<<<< HEAD
router.route("/find").get(execute);
router.route("/livecount").get(execute);
=======
>>>>>>> 26753cfce5fe1d84a162012b7e9dedf5ed2b66db
>>>>>>> 9383301948846035181abdf7d0fd5ff0fa44425a
exports.default = router;
