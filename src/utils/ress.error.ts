import { Response } from "express";
import os from "os";
import logger, { LogTypes } from "./logger";
import DiscordLogger from "node-discord-logger";
import ErrorHandler from "./errors.handler";

const disc_logger = new DiscordLogger({
	hook: "https://discord.com/api/webhooks/1187450079842414694/CAoiT2UtT44zl4YH-GxGKb_T_Hv4IC46uIFkjW4Xl2e12rXMmsDOfXkRmx2cFv8fl5D9",
	icon: "https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png", // optional, will be included as an icon in the footer
	serviceName: "Mini-Milan-2024 Error Logger 🔥", // optional, will be included as text in the footer
	defaultMeta: {
		// optional, will be added to all the messages
		"Process ID": process.pid,
		Host: os.hostname(), // import os from 'os';
	},
	errorHandler: (err) => {
		// // optional, if you don't want this library to log to console
		// console.error("error from discord", err);
	},
});

export const errorHandler = (res: Response, error: any) => {
	disc_logger.error({
		message: error?.message ?? "sample error",
		error: new Error("sample error"), // This field can be included in other log functions as well
	});

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
