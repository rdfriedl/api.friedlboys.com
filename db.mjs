import mysql from "promise-mysql";

export default async function() {
	if (!process.env.DB_URL || process.env.DB_HOST) {
		throw new Error("DB_URL or DB_HOST has to be set");
	}

	let db = await mysql.createConnection(
		process.env.DB_URL || {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS || process.env.DB_PASSWORD,
			database: process.env.DB_NAME || process.env.DB_DATABASE
		}
	);

	return db;
}
