// Import the JSON data containing user_club and user_event information
// const clubData = require("./clubData.json"); // Replace with the actual path to your JSON data

function generateRandomName() {
	// Generate a random name (you can replace this logic with any random string generation method)
	const randomString = Math.random().toString(36).substring(7);
	return randomString;
}

function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

// Example usage:
const uuid = generateUUID();
console.log(uuid);

function generateRandomPhoneNumber() {
	const randomNumber = Math.floor(Math.random() * 10000000000); // 10-digit number
	return `1${String(randomNumber).padStart(9, "0")}`; // Ensure it starts with '1'
}

function generateRandomDepartment() {
	const departments = [
		"Computer Science",
		"Engineering",
		"Mathematics",
		"Physics",
		"Biology",
	];
	return departments[Math.floor(Math.random() * departments.length)];
}

function generateRandomYear() {
	return Math.floor(Math.random() * 4) + 1; // Year 1 to 4
}

// "ticket_type": "General Admission",
// "user_id": "a38785cd-9ee5-436f-b6f5-50b957a74be4",
// "payment_id": "a38785cd-9ee5-436f-b6f5-50b957a74b56",
// "ticket_id": "a38785cd-9ee5-436f-b6f5-50b957a74b76",
// "payment_status": "Paid",
// "ticket_status": "Valid",
// "offline_ticket_issued": false

module.exports = {
	generateRandomBody: function (requestParams, context, ee, next) {
		const ticket_type = generateRandomName();
		const user_id = generateUUID();
		const payment_id = generateUUID();
		const ticket_id = generateUUID();
		const payment_status = "Paid";
		const ticket_status = "Valid";
		const offline_ticket_issued = false;

		// Randomly select a club and an event from the predefined JSON data
		// const randomClub = clubData[Math.floor(Math.random() * clubData.length)];
		// const randomEvent =
		// 	randomClub.user_events[
		// 		Math.floor(Math.random() * randomClub.user_events.length)
		// 	];

		let data = {
			ticket_type,
			user_id,
			payment_id,
			ticket_id,
			payment_status,
			ticket_status,
			offline_ticket_issued,
		};
		context.vars["data"] = data;
		return next();
	},
};
