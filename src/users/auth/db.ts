import db from "../../config/pg.config";
import ErrorHandler from "../../utils/errors.handler";
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
    reqObj.created_at = new Date();
    reqObj.updated_at = new Date();

    const query = db.format(`INSERT INTO users ? RETURNING *`, reqObj);

    try {
      const { rows } = await db.query(query);
      return rows[0] as unknown as IUserAuthResObject;
    } catch (err) {
      throw new ErrorHandler({
        status_code: 400,
        message: "Something went wrong while creating user",
        message_code: "PHONE_NUMBER_ALREADY_EXISTS",
      });
    }
  };
}
