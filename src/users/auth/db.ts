import db from "../../config/pg.config";
import { IUserAuthResObject, IUserAuthSignupReqObj } from "./interface";

export default class UsersAuthDB {
	protected getUserByEmail = async (
		email: string
	): Promise<IUserAuthResObject> => {
		const query = `SELECT * FROM users WHERE email = $1 AND is_deleted = false LIMIT 1`;

		const { rows } = await db.query(query, [email]);

		return rows[0] as unknown as IUserAuthResObject;
	};

	protected getUser = async (id: string): Promise<IUserAuthResObject> => {
		const query = `SELECT * FROM users WHERE id = $1 AND is_deleted = false LIMIT 1`;

		const { rows } = await db.query(query, [id]);

		return rows[0] as unknown as IUserAuthResObject;
	};

	protected createUser = async (
		reqObj: IUserAuthSignupReqObj
	): Promise<IUserAuthResObject> => {
		const query = db.format(`INSERT INTO users ? RETURNING *`, reqObj);

		const { rows } = await db.query(query);
		return rows[0] as unknown as IUserAuthResObject;
	};

	protected reviveUser = async (id: string): Promise<IUserAuthResObject> => {
		const query = `UPDATE users SET is_deleted = false WHERE id = $1 RETURNING *`;

		const { rows } = await db.query(query, [id]);

		return rows[0] as unknown as IUserAuthResObject;
	};

	protected isExistingUser = async (
		email: string,
		phone_number: number
	): Promise<IUserAuthResObject> => {
		const query = `SELECT * FROM users WHERE email = $1 OR phone_number = $2 AND is_deleted = false LIMIT 1`;

		const { rows } = await db.query(query, [email, phone_number]);

		return rows[0] as unknown as IUserAuthResObject;
	};

	protected deleteUser = async (user_id: string): Promise<void> => {
		const query = `UPDATE users SET is_deleted = true WHERE id = $1`;

		await db.query(query, [user_id]);
	};
}
