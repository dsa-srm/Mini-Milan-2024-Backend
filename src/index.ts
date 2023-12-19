import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, Response, Request } from "express";
import cors from "cors";
import morgan from "morgan";
import logger, { LogTypes } from "./utils/logger";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(
	cors({
		origin: "http://localhost:5173",
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

app.use("/api/users", UsersAuthRoutes);

app.get("/", (req: Request, res: Response) => {
	const date = new Date().toLocaleString();
	res.status(200).send({
		message: "Route Found",
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
