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

	protected reviveUser = async (
		id: string,
		reqObj: IUserAuthSignupReqObj
	): Promise<IUserAuthResObject> => {
		const {
			name,
			email,
			password,
			reg_number,
			is_ktr_student,
			gender,
			phone_number,
			updated_at,
		} = reqObj;

		const query = `
    UPDATE users
    SET
      name = $1,
      email = $2,
      password = $3,
      reg_number = $4,
      is_ktr_student = $5,
      gender = $6,
      phone_number = $7,
      updated_at = $8,
      is_deleted = false
      WHERE id = $9
      RETURNING *`;

		const values = [
			name,
			email,
			password,
			reg_number,
			is_ktr_student,
			gender,
			phone_number,
			updated_at,
			id,
		];

		const { rows } = await db.query(query, values);

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

	protected deleteUser = async (user_id: string): Promise<void> => {
		const query = `UPDATE users SET is_deleted = true WHERE id = $1`;

		await db.query(query, [user_id]);
	};
}

export class ExtendedUserServiceDb extends UsersAuthDB {
	getUser_Email = async (email: string): Promise<IUserAuthResObject> => {
		return await this.getUserByEmail(email);
	};
}
