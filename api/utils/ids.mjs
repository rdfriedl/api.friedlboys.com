import CheveretoIds from "./chevereto-ids";
import Setting from "../../model/Setting";

export async function encode(number) {
	let ids = await getIds();

	return ids ? ids.encode(number) : null;
}
export async function decode(string) {
	let ids = await getIds();

	return ids ? ids.decode(string) : null;
}

let idsCache;
export function getIds() {
	if (!idsCache) {
		idsCache = createIdsFromDb();
	}

	return idsCache;
}

export async function createIdsFromDb() {
	let salt = await Setting.findOne({ where: { name: "crypt_salt" } });
	let idPadding = await Setting.findOne({ where: { name: "id_padding" } });

	if (!salt || !idPadding) {
		throw new Error("settings table not initialized");
	}

	return CheveretoIds(salt.value, parseInt(idPadding.value) || 0);
}
