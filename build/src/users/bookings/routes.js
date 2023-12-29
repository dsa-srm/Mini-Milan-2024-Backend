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
<<<<<<< HEAD:build/src/users/bookings/routes.js
router.use(protect);
router.route("/").get().post(protect, execute);
router.route("/:id").patch(protect, execute).delete();
=======
// router.use(protect);
router.route("/").get(execute);
router.route("/livecount").get(execute);
>>>>>>> cddf6baaa5ee704264d93596f5dd8dfb247c2281:src/users/bookings/routes.js
exports.default = router;
