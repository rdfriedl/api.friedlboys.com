import * as ids from "./ids";

export async function processResults(instances = [], ID_FIELDS) {
	if (Array.isArray(instances)) {
		return Promise.all(
			instances.map(instance =>
				convertIdFields(instance.get({ plain: true }), ID_FIELDS)
			)
		);
	}

	return convertIdFields(instances.get({ plain: true }), ID_FIELDS);
}

export async function convertIdFields(entity, ID_FIELDS = []) {
	for (let field of ID_FIELDS) {
		if (Number.isFinite(entity[field])) {
			entity[field] = await ids.encode(entity[field]);
		}
	}

	return entity;
}
