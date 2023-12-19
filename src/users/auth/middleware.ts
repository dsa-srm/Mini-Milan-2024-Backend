import jwt from "jsonwebtoken";
import fs from "fs";
import { errorHandler } from "../../utils/ress.error";
import path from "path";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errors.handler";

export default class IUserAuthValidation {
	private jwtVerifyPromisified = (token: string, secret: Buffer) => {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, {}, (err, payload) => {
				if (err) {
					reject(err);
				} else {
					resolve(payload);
				}
			});
		});
	};

	public protect = async (req: Request, res: Response, next: NextFunction) => {
		try {
			let token;
			// 1. Getting the token & Checking if it is there with the header??
			if (
				req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")
			) {
				token = req.headers.authorization.split(" ")[1];
			} else if (req.cookies.token) {
				// To check for the jwt in cookie
				token = req.cookies.token;
			} else {
				throw new ErrorHandler({
					status_code: 400,
					message: "You are not logged in! Please log in to get access.",
					message_code: "NOT_LOGGED_IN",
				});
			}

			const JWT_SECRET = fs.readFileSync(
				path.resolve(__dirname, "../../../keys/jwtRS256.key")
			);

			// 2. Verification of Token
			const payload = await this.jwtVerifyPromisified(token, JWT_SECRET);

			next();
		} catch (error) {
			errorHandler(res, error);
		}
	};
}
