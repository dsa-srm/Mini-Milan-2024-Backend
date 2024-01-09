import DiscordLogger from "node-discord-logger";
import os from "os";

export const disc_logger = new DiscordLogger({
	hook: "https://discord.com/api/webhooks/1192100868342939778/2e3_t07fXsVn7GK_mihvXBd30XEJxK7gWLVoRSwKrqEZewLy4NxahgzIqEN9gYxIHxVQ ",
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
