import mysql from "mysql";
import { getConn } from "../lib/db.mjs";
import {
	convertIdFields,
	getTableName,
	removePropertyPrefix
} from "./utils/index";

const DEFAULT_QUERY = {};
const REMOVE_FIELDS = [];
const ID_FIELDS = ["user_id", "id"];

function createAlbumObject(albumData) {
	let album = removePropertyPrefix(albumData, "album_");

	for (let field in REMOVE_FIELDS) {
		delete album[field];
	}

	return convertIdFields(album, ID_FIELDS);
}

export async function find(query = {}) {
	let db = await getConn();
	let parsedQuery = Object.assign({}, DEFAULT_QUERY, query);
	parsedQuery = convertIdFields(parsedQuery, ID_FIELDS);

	let queryString = `SELECT * FROM ${getTableName("albums")}`;

	if (Object.keys(parsedQuery).length) {
		let props = Object.keys(parsedQuery)
			.map(key => `album_${key}=?`)
			.join(" AND ");

		queryString = mysql.format(
			`SELECT * FROM ${getTableName("albums")} WHERE ${props}`,
			Object.values(parsedQuery)
		);
	}

	let albums = await db.query(queryString);

	return albums.map(createAlbumObject);
}
7;
