module.exports = {
	generateRandomBody: function (requestParams, context, ee, next) {
		const generateRandomName = () => {
			const randomString = Math.random().toString(36).slice(-6);
			return randomString;
		};

		function generateRandomEmail() {
			const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			const digits = "0123456789";

			// Generate two random letters
			const randomLetters = `${letters.charAt(
				Math.floor(Math.random() * letters.length)
			)}${letters.charAt(Math.floor(Math.random() * letters.length))}`;

			// Generate four random digits
			const randomDigits = `${digits.charAt(
				Math.floor(Math.random() * digits.length)
			)}${digits.charAt(
				Math.floor(Math.random() * digits.length)
			)}${digits.charAt(
				Math.floor(Math.random() * digits.length)
			)}${digits.charAt(Math.floor(Math.random() * digits.length))}`;

			// Concatenate the generated parts to form the email address
			const randomEmail = `${randomLetters}${randomDigits}@srmist.edu.in`;

			return randomEmail;
		}

		const generateUUID = () => {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
				/[xy]/g,
				function (c) {
					const r = (Math.random() * 16) | 0;
					const v = c === "x" ? r : (r & 0x3) | 0x8;
					return v.toString(16);
				}
			);
		};

		const generateRandomPhoneNumber = () => {
			const randomNumber = Math.floor(Math.random() * 1000000000); // 10-digit number
			return `1${String(randomNumber).padStart(9, "0")}`; // Ensure it starts with '1'
		};

		const generateRandomBody = () => {
			const name = generateRandomName();
			const email = generateRandomEmail();
			const password = generateUUID();
			const reg_number = `RA${Math.floor(Math.random() * 100000000000000)}`;
			const is_ktr_student = Math.random() < 0.5; // Randomly true or false
			const gender = Math.random() < 0.5 ? "male" : "female"; // Randomly male or female
			const phone_number = generateRandomPhoneNumber();

			return {
				name,
				email,
				password,
				reg_number,
				is_ktr_student,
				gender,
				phone_number,
			};
		};

		let data = generateRandomBody();
		context.vars["data"] = data;
		return next();
	},
};
