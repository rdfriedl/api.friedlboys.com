import { getTableName, removePropertyPrefix } from "../utils/utils.mjs";

const REMOVE_FIELDS = [];
function createImageObject(imageData) {
	let image = removePropertyPrefix(imageData, "image_");

	for (let field in REMOVE_FIELDS) {
		delete image[field];
	}

	return image;
}

export default db => ({
	find(query = {}) {
		if (Object.keys(query).length) {
			let props = Object.keys(query)
				.map(key => `image_${key}=?`)
				.join(" AND ");

			return db
				.query(
					`SELECT * FROM ${getTableName("images")} WHERE ${props}`,
					Object.values(query)
				)
				.then(images => images.map(createImageObject));
		}

		return db
			.query(`SELECT * FROM ${getTableName("images")}`)
			.then(images => images.map(createImageObject));
	}
});
