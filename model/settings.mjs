import mysql from "mysql";
import { getConn } from "../lib/db.mjs";
import { getTableName, removePropertyPrefix } from "./utils/index";

const REMOVE_FIELDS = [];

function createSettingObject(settingData) {
	let setting = removePropertyPrefix(settingData, "setting_");

	for (let field in REMOVE_FIELDS) {
		delete setting[field];
	}

	return setting;
}

export async function find(query = {}) {
	let db = await getConn();

	let queryString = `SELECT * FROM ${getTableName("settings")}`;

	if (Object.keys(query).length) {
		let props = Object.keys(query)
			.map(key => `setting_${key}=?`)
			.join(" AND ");

		queryString = mysql.format(
			`SELECT * FROM ${getTableName("settings")} WHERE ${props}`,
			Object.values(query)
		);
	}

	let settings = await db.query(queryString);

	return settings.map(createSettingObject);
}
