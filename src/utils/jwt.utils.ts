import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export default class JWTUtils {
	PRIVATE_KEY: string;
	PUBLIC_KEY: string;

  constructor() {
    this.PRIVATE_KEY = fs.readFileSync(
      path.resolve(__dirname, "../../keys/jwtRS256.key"),
      "utf8"
    );
    this.PUBLIC_KEY = fs.readFileSync(
      path.resolve(__dirname, "../../keys/jwtRS256.pub.key"),
      "utf8"
    );
  }

	public generateTokens = async (
		userData: any
	): Promise<{
		access_token: string;
		refresh_token: string;
	}> => {
		const [access_token, refresh_token] = await Promise.all([
			this.generateAccessToken(userData),
			this.generateRefreshToken(userData),
		]);

		return {
			access_token,
			refresh_token,
		};
	};

	private generateAccessToken = async (userData: any) => {
		const access_token = jwt.sign(
			{
				token: "access_token",
				data: userData,
			},
			this.PRIVATE_KEY,
			{
				expiresIn: "15d",
				algorithm: "RS256",
			}
		);
		return access_token;
	};

	private generateRefreshToken = async (userData: any) => {
		const refresh_token = jwt.sign(
			{
				token: "refresh_token",
				data: userData,
			},
			this.PRIVATE_KEY,
			{
				expiresIn: "24h",
				algorithm: "RS256",
			}
		);
		return refresh_token;
	};
}
