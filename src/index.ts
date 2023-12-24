import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Response, Request } from "express";
import cors from "cors";
import moment from "moment-timezone";
import morgan from "morgan";
import logger, { LogTypes } from "./utils/logger";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Application = express();

const desiredTimeZone = "Asia/Kolkata"; // India Standard Time (GMT+5:30)

// Get the current time in the specified time zone

app.use(
	cors({
		origin: ["http://localhost:5173", "https://mini.srmmilan.org", "*"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Routes
import UsersAuthRoutes from "./users/auth/routes";
import UsersBookingRoutes from "./users/bookings/routes";

app.use("/api/users", UsersAuthRoutes);
app.use("/api/bookings", UsersBookingRoutes);

app.get("/", (req: Request, res: Response) => {
	const date = moment().tz(desiredTimeZone).format("YYYY-MM-DD HH:mm:ss");
	res.status(200).send({
		message: "Server is running",
		status_code: 200,
		entry_time: date,
	});
});

app.use("*", (req: Request, res: Response) => {
	res.status(404).send({
		message: "Route not Found",
		status_code: 404,
	});
});

app.listen(process.env.PORT || 4000, () => {
	logger(
		`Server is running on port ${process.env.PORT ?? 4000}`,
		LogTypes.LOGS
	);
});
