import { getTableName, removePropertyPrefix } from "../utils/utils.mjs";

const REMOVE_FIELDS = [];
function createUserObject(settingData) {
	let setting = removePropertyPrefix(settingData, "setting_");

	for (let field in REMOVE_FIELDS) {
		delete setting[field];
	}

	return setting;
}

export default db => ({
	find(query = {}) {
		if (Object.keys(query).length) {
			let props = Object.keys(query)
				.map(key => `setting_${key}=?`)
				.join(" AND ");

			return db
				.query(
					`SELECT * FROM ${getTableName("settings")} WHERE ${props}`,
					Object.values(query)
				)
				.then(settings => settings.map(createUserObject));
		}

		return db
			.query(`SELECT * FROM ${getTableName("settings")}`)
			.then(settings => settings.map(createUserObject));
	}
});
