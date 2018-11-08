import CheveretoIds from "./chevereto-ids";
import model from "../model";

let ids;

export function encode(id) {
	return ids ? ids.encode(id) : null;
}
export function decode(id) {
	return ids ? ids.decode(id) : null;
}

export function setSalt(salt, idPadding) {
	ids = CheveretoIds(salt, idPadding || 0);

	return ids;
}

export async function loadSaltFromDb() {
	let saltRow = await model.settings.find({ name: "crypt_salt" });
	let idPaddingRow = await model.settings.find({ name: "id_padding" });

	if (saltRow.length === 0 || idPaddingRow.length === 0) {
		throw new Error("settings table not initialized");
	}

	let salt = saltRow[0].value;
	let idPadding = parseInt(idPaddingRow[0].value);

	return setSalt(salt, idPadding);
}

// export default async function ids({ model }) {
// 	let saltRow = await model.settings.find({ name: "crypt_salt" });
// 	let idPaddingRow = await model.settings.find({ name: "id_padding" });
//
// 	if (saltRow.length === 0 || idPaddingRow.length === 0) {
// 		throw new Error("settings table not initialized");
// 	}
//
// 	let salt = saltRow[0].value;
// 	let idPadding = parseInt(idPaddingRow[0].value);
//
// 	return CheveretoIds(salt, idPadding || 0);
// }
