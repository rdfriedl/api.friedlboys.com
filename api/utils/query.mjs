import * as ids from "./ids";

function setValue(obj = {}, path = [], value) {
	let prop = path.shift();

	if (path.length === 0) {
		return (obj[prop] = value);
	}

	if (!obj[prop]) {
		obj[prop] = {};
	}
	return setValue(obj[prop], path, value);
}
export function expandQuery(query = {}) {
	let newQuery = {};

	for (let path in query) {
		setValue(newQuery, path.split("."), query[path]);
	}

	return newQuery;
}

export function parseFieldValue(value) {
	if (Array.isArray(value)) {
		return value.map(parseFieldValue);
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

export async function convertIdFields(where = {}, ID_FIELDS = []) {
	let newObj = {};

	for (let field of ID_FIELDS) {
		if (!where.hasOwnProperty(field)) continue;

		newObj[field] = parseFieldValue(where[field]);

		if (Array.isArray(newObj[field])) {
			newObj[field] = await Promise.all(
				newObj[field].map(val => ids.decode(val))
			);
		} else if (typeof newObj[field] === "string") {
			let original = newObj[field];
			newObj[field] = await ids.decode(newObj[field]);

			if (isNaN(newObj[field])) {
				// reset the field if it failed to parse the id
				newObj[field] = original;
			}
		}
	}

	return newObj;
}

export async function parseQuery(query = {}, ID_FIELDS = []) {
	let where = Object.assign({}, query.where || {});
	let order = parseFieldValue(query.order);
	let offset = parseFieldValue(query.offset);
	let limit = parseFieldValue(query.limit);

	if (order) {
		if (!Array.isArray(order)) {
			order = [order];
		}

		order = order
			.map(value => {
				if (typeof value === "string") {
					if (value.indexOf("-") === 0) {
						return [value.substring(1, value.length), "DESC"];
					} else return value;
				}
			})
			.filter(Boolean);
	}

	// parse values
	for (let key in where) {
		if (!where.hasOwnProperty(key)) continue;

		where[key] = parseFieldValue(where[key]);
	}

	// convert ids
	let idFields = await convertIdFields(where, ID_FIELDS);
	Object.assign(where, idFields);

	return {
		where,
		order,
		offset,
		limit
	};
}

export function getSequelizeQuery(query = {}, ID_FIELDS = []) {
	return parseQuery(expandQuery(query), ID_FIELDS);
}
