import jwt from "jsonwebtoken";
import fs from "fs";
import { errorHandler } from "../../utils/ress.error";
import path from "path";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/errors.handler";
import Joi from "joi";

export default class IUserAuthValidation {
	public static validateEmailAndPhoneNumber = (
		email: string,
		phone_number: number
	) => {
		if (!email || !phone_number) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Email or Phone Number is required.",
				message_code: "EMAIL_OR_PHONE_NUMBER_REQUIRED",
			});
		}

		const emailSchema = Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: true },
		});

		const phoneSchema = Joi.string().pattern(/^[0-9]{10}$/);

		const emailValidationResult = emailSchema.validate(email);
		const phoneValidationResult = phoneSchema.validate(phone_number.toString());

		if (emailValidationResult.error) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Invalid email format.",
				message_code: "INVALID_EMAIL_FORMAT",
			});
		}

		if (phoneValidationResult.error) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Invalid phone number format.",
				message_code: "INVALID_PHONE_NUMBER_FORMAT",
			});
		}
	};

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

			if (!payload) {
				throw new ErrorHandler({
					status_code: 400,
					message: "You are not logged in! Please log in to get access.",
					message_code: "NOT_LOGGED_IN",
				});
			}

			const jsonPayload = JSON.parse(JSON.stringify(payload));

			req.body.current_user = jsonPayload.data;

			next();
		} catch (error) {
			errorHandler(res, error);
		}
	};

	public checkIsKtrStudentEmail = (email: string) => {
		const ktr_email_schema = Joi.string().pattern(
			/^[a-zA-Z]{2}[0-9]{4}@srmist.edu.in$/
		);

		const ktr_email_validation_result = ktr_email_schema.validate(email);

		if (ktr_email_validation_result.error) {
			throw new ErrorHandler({
				status_code: 400,
				message: "Invalid KTR Student email format.",
				message_code: "INVALID_KTR_STUDENT_EMAIL_FORMAT",
			});
		}
	};
}

// 1.soft delete
// 2.is ktr-student
// 3.regex
// 4.Error Discord
// 5.gender
