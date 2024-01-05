import { Router } from "express";
import UsersAuthController from "./controller";
import IUserAuthValidation from "./middleware";
const router: Router = Router();

const { execute } = new UsersAuthController();
const { protect } = new IUserAuthValidation();

router.post("/login", execute);
router.post("/signup", execute);
router.get("/current", protect, execute);
router.get("/:id", protect, execute);
router.delete("/:id", protect, execute);

export default router;
