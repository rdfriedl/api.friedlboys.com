import mysql from "mysql";
import { getConn } from "../lib/db.mjs";
import {
	convertIdFields,
	getTableName,
	removePropertyPrefix
} from "./utils/index";

const REMOVE_FIELDS = [];
const ID_FIELDS = ["user_id", "id"];

function createUserObject(userData) {
	let user = removePropertyPrefix(userData, "user_");

	for (let field in REMOVE_FIELDS) {
		delete user[field];
	}

	return convertIdFields(user, ID_FIELDS);
}

export async function find(query = {}) {
	let db = await getConn();

	let queryString = `SELECT * FROM ${getTableName("users")}`;

	if (Object.keys(query).length) {
		let parsedQuery = convertIdFields(query, ID_FIELDS);
		let props = Object.keys(parsedQuery)
			.map(key => `user_${key}=?`)
			.join(" AND ");

		queryString = mysql.format(
			`SELECT * FROM ${getTableName("users")} WHERE ${props}`,
			Object.values(parsedQuery)
		);
	}

	let users = await db.query(queryString);

	return users.map(createUserObject);
}
