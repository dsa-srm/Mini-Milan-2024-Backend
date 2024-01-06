import { Router } from "express";
import IUserAuthValidation from "../auth/middleware";
import BookingsController from "./controller";
const router: Router = Router();

const { protect } = new IUserAuthValidation();
const { execute } = new BookingsController();

// router.use(protect);

router.route("/").get(execute);

router.route("/find").get(execute);

router.route("/livecount").get(execute);

export default router;
