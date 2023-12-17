import { Pool } from "pg";
// @ts-ignore
import { format, buildWhereFromQuery, transformer } from "sqlutils/pg";

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: parseInt(String(process.env.DB_PORT)),
  ssl: {
    rejectUnauthorized: false, // Use this line if you face self-signed certificate issues
  },
  sslmode: 'require',
};

const pool = new Pool(config);

export default {
	async query(text: any, params?: any) {
		const start = Date.now();
		text = text.replace(/\n/g, "");
		// if (isDev) console.log("to be executed query", { text });
		const res = await pool.query(text, params);
		const duration = Date.now() - start;
		return res;
	},
	format,
	buildWhereFromQuery,
	transformer,
};
