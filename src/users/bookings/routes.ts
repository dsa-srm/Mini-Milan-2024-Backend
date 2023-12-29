import { Router } from "express";
import IUserAuthValidation from "../auth/middleware";
import BookingsController from "./controller";
const router: Router = Router();

const { protect } = new IUserAuthValidation();
const { execute } = new BookingsController();

// router.use(protect);

router.route("/").get(execute);

<<<<<<< HEAD
router.route("/:id").patch(protect, execute).delete();
=======
router.route("/livecount").get(execute);
>>>>>>> cddf6baaa5ee704264d93596f5dd8dfb247c2281

export default router;
