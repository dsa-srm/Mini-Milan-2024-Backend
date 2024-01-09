import { Pool } from "pg";
// @ts-ignore
import { format, buildWhereFromQuery, transformer } from "sqlutils/pg";
import { disc_logger } from "../utils/disc_logger";

const config = {
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: parseInt(String(process.env.DB_PORT)),
	ssl: {
		rejectUnauthorized: false, // Use this line if you face self-signed certificate issues
	},
	sslmode: "require",
};

let pool: Pool;

try {
	pool = new Pool(config);
} catch (err: any) {
	disc_logger.error({
		message: err?.message ?? "sample error",
		error: new Error("sample error"), // This field can be included in other log functions as well
	});
}

export default {
	async query(text: any, params?: any) {
		try {
			const start = Date.now();
			text = text.replace(/\n/g, "");
			// if (isDev) console.log("to be executed query", { text });
			const res = await pool.query(text, params);
			const duration = Date.now() - start;
			return res;
		} catch (err: any) {
			disc_logger.error({
				message: err?.message ?? "sample error",
				error: new Error("sample error"), // This field can be included in other log functions as well
			});
			return err;
		}
	},
	format,
	buildWhereFromQuery,
	transformer,
};
