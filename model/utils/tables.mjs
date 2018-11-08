export function getTableName(name) {
	return (process.env.CHEVERETO_DB_PREFIX || "chv_") + name;
}
