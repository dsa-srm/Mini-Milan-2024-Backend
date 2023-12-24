import db from "../../config/pg.config";
import { IUserAuthResObject, IUserAuthSignupReqObj } from "./interface";

export default class UsersAuthDB {
	protected getUser = async (email: string): Promise<IUserAuthResObject> => {
		const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;

		const { rows } = await db.query(query, [email]);

		return rows[0] as unknown as IUserAuthResObject;
	};

	protected createUser = async (
		reqObj: IUserAuthSignupReqObj
	): Promise<IUserAuthResObject> => {
		const query = db.format(`INSERT INTO users ? RETURNING *`, reqObj);

		const { rows } = await db.query(query);
		return rows[0] as unknown as IUserAuthResObject;
	};

	protected isExistingUser = async (
		email: string,
		phone_number: number
	): Promise<IUserAuthResObject> => {
		const query = `SELECT * FROM users WHERE email = $1 OR phone_number = $2 LIMIT 1`;

		const { rows } = await db.query(query, [email, phone_number]);

		return rows[0] as unknown as IUserAuthResObject;
	};
}
