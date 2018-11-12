import mysql from "mysql";
import { getConn } from "../lib/db.mjs";
import {
	convertIdFields,
	getTableName,
	removePropertyPrefix
} from "./utils/index";

const DEFAULT_QUERY = {};
const REMOVE_FIELDS = [];
const ID_FIELDS = ["user_id", "album_id", "id"];

function createImageObject(imageData) {
	let image = removePropertyPrefix(imageData, "image_");

	for (let field in REMOVE_FIELDS) {
		delete image[field];
	}

	return convertIdFields(image, ID_FIELDS);
}

export async function find(query = {}) {
	let db = await getConn();
	let parsedQuery = Object.assign({}, DEFAULT_QUERY, query);
	parsedQuery = convertIdFields(parsedQuery, ID_FIELDS);

	let queryString = `SELECT * FROM ${getTableName("images")}`;

	if (Object.keys(parsedQuery).length) {
		let props = Object.keys(parsedQuery)
			.map(key => `image_${key}=?`)
			.join(" AND ");

		queryString = mysql.format(
			`SELECT * FROM ${getTableName("images")} WHERE ${props}`,
			Object.values(parsedQuery)
		);
	}

	let images = await db.query(queryString);

	return images.map(createImageObject);
}
