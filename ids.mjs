import CheveretoIds from "./utils/chevereto-ids.mjs";

export default async function ids(model) {
	let saltRow = await model.settings.find({ name: "crypt_salt" });
	let idPaddingRow = await model.settings.find({ name: "id_padding" });

	if (saltRow.length === 0 || idPaddingRow.length === 0) {
		throw new Error("settings table not initialized");
	}

	let salt = saltRow[0].value;
	let idPadding = parseInt(idPaddingRow[0].value);

	return CheveretoIds(salt, idPadding || 0);
}
