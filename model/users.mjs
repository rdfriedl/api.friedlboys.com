import { getTableName, removePropertyPrefix } from "../utils.mjs";

const REMOVE_FIELDS = [];
function createUserObject(userData) {
	let user = removePropertyPrefix(userData, "user_");

	for (let field in REMOVE_FIELDS) {
		delete user[field];
	}

	return user;
}

export default db => ({
	find(query = {}) {
		if (Object.keys(query).length) {
			let props = Object.keys(query)
				.map(key => `user_${key}=?`)
				.join(" AND ");

			return db
				.query(
					`SELECT * FROM ${getTableName("users")} WHERE ${props}`,
					Object.values(query)
				)
				.then(users => users.map(createUserObject));
		}

		return db
			.query(`SELECT * FROM ${getTableName("users")}`)
			.then(users => users.map(createUserObject));
	}
});
