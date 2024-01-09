import { Response } from "express";
import logger, { LogTypes } from "./logger";
import ErrorHandler from "./errors.handler";
import { disc_logger } from "./disc_logger";

export const errorHandler = (res: Response, error: any) => {
	if (error?.is_loggable) {
		disc_logger.error({
			message: `${error.message_code}`,
			description: `
			# Error Details
			
			### Message : 
			${error.message}
			
			### User : 
			${error.user ?? ""}
			
			### Timestamp : 
			${new Date().toLocaleString()}
			`,
			error: error, // This field can be included in other log functions as well
		});
	}

	logger(
		`Request failed with: ${
			error ? error.message ?? JSON.stringify(error) : "No error"
		}`,
		LogTypes.CUSTOM_OBJ
	);

	if (error instanceof ErrorHandler) {
		return res.status(error.status_code).send({
			success: false,
			message: error.message,
			data: error.data,
			message_code: error.message_code,
		});
	}

	return res.status(500).send({
		success: false,
		message: "Hold Tight! Our Engineers Are on the Case",
	});
};
