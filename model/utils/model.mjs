export function prefixModelFields(prefix = "", model = {}) {
	let newModel = {};

	for (let name in model) {
		if (!model.hasOwnProperty(name)) continue;

		let field = model[name];

		if (typeof field !== "object" || !field.type) {
			field = { type: field };
		}

		newModel[name] = {
			...field,
			field: field.field || prefix + name
		};
	}

	return newModel;
}
