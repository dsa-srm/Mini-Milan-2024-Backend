import { pino } from "pino";
import pretty from "pino-pretty";

const stream = pretty({
	colorize: true,
	translateTime: "yyyy-mm-dd HH:MM:ss",
});

const init = () => pino(stream);

export enum LogTypes {
	LOGS = "logs",
	CUSTOM_OBJ = "customObj",
}

const Logs = (msg: string) => init().info(msg);
const customLogHandler = (obj: any) => init().child(obj);

const logger = (msg: any, func: LogTypes) => {
	if (LogTypes.LOGS) return Logs(msg);
	return customLogHandler(msg);
};

export default logger;
