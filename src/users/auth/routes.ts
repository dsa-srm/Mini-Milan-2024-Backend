import { Router } from "express";
import UsersAuthController from "./controller";
const router: Router = Router();

const { execute } = new UsersAuthController();

router.post("/login", execute);
router.post("/signup", execute);
router.delete("/:id", execute);

export default router;
