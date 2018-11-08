import { encode, decode } from "../../lib/ids.mjs";

export function convertIdFields(obj, fields = ["id"]) {
	let copy = Object.assign({}, obj);

	fields.forEach(key => {
		if (typeof copy[key] === "string") {
			copy[key] = decode(copy[key]);
		} else if (
			typeof copy[key] === "number" ||
			Number.isFinite(parseInt(copy[key]))
		) {
			copy[key] = encode(parseInt(copy[key]));
		}
	});

	return copy;
}
