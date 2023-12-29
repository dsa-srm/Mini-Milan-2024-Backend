import { Router } from "express";
import IUserAuthValidation from "../auth/middleware";
import BookingsController from "./controller";
const router: Router = Router();

const { protect } = new IUserAuthValidation();
const { execute } = new BookingsController();

router.use(protect);

router.route("/").get().post(protect, execute);

router.route("/:id").patch(protect, execute).delete();

export default router;
