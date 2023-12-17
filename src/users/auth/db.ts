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
		const query = db.format(`INSERT INTO users ?`, reqObj);
		const { rows } = await db.query(query);
		return rows[0] as unknown as any;
	};
}
