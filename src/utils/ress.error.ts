import { Response } from "express";
import logger, { LogTypes } from "./logger";
import ErrorHandler from "./errors.handler";

export const errorHandler = (res: Response, error: any) => {
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
