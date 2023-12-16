import { Router } from "express";
import UsersAuthController from "./controller";
const router: Router = Router();

const { execute } = new UsersAuthController();

router.post("/login", execute);

export default router;
