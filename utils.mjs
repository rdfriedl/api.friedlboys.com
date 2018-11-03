export function removePropertyPrefix(object, prefix) {
	return Object.keys(object).reduce((obj, key) => {
		obj[key.replace(prefix, "")] = object[key];

		return obj;
	}, {});
}

export const wrap = fn => {
	return (req, res, next) => {
		return fn(req, res, next)
			.then(data => {
				if (data !== undefined && typeof data === "object") {
					res.json(data);
				}
			})
			.catch(next);
	};
};

export function getTableName(name) {
	return (process.env.CHEVERETO_DB_PREFIX || "") + name;
}
