import { Router, response } from "express";
import UsersAuthController from "./controller";
import IUserAuthValidation from "./middleware";
import rateLimiter from "express-rate-limit";


//Creating a rate limiter
const limiter = rateLimiter({
  //Amount of requests per window
  max: 15,
  //Window size in ms
  windowMs: 15 * 60 * 1000, //15 mins
  //Message on error

  message: "Too many requests from this IP, try again in 15mins !!"
});

const router: Router = Router();

const { execute } = new UsersAuthController();
const { protect } = new IUserAuthValidation();

router.post("/login", limiter, execute);
router.get("/logout", execute);
router.post("/signup", limiter, execute);
router.get("/current", protect, execute);
router.get("/:id", protect, execute);
router.delete("/:id", protect, execute);

export default router;
