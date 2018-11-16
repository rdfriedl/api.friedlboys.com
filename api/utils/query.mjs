import * as ids from "./ids";

export function parseFieldValue(value) {
	if (Array.isArray(value)) {
		return value.map(parseField);
	} else if (Number.isFinite(parseFloat(value))) {
		return parseFloat(value);
	} else if (value === "null") {
		return null;
	} else if (value === "false") {
		return false;
	} else if (value === "true") {
		return true;
	}

	return value;
}

export async function parseQuery(query = {}, ID_FIELDS = []) {
	let newQuery = {};

	// parse values
	for (let key in query) {
		if (!query.hasOwnProperty(key)) continue;

		newQuery[key] = parseFieldValue(query[key]);
	}

	// convert ids
	for (let field of ID_FIELDS) {
		if (!newQuery.hasOwnProperty(field)) continue;

		if (Array.isArray(newQuery[field])) {
			newQuery[field] = await Promise.all(
				newQuery[field].map(val => ids.decode(val))
			);
		} else if (typeof newQuery[field] === "string") {
			newQuery[field] = await ids.decode(newQuery[field]);
		}

		if(isNaN(newQuery[field])){
			// reset the field if it failed to parse the id
			newQuery[field] = parseFieldValue(query[field]);
		}
	}

	return newQuery;
}
