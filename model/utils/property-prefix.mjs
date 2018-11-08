export function removePropertyPrefix(object, prefix) {
	return Object.keys(object).reduce((obj, key) => {
		obj[key.replace(prefix, "")] = object[key];

		return obj;
	}, {});
}
