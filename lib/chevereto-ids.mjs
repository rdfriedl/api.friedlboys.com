import Hashids from "hashids";

const CheveretoIds = (salt, idPadding = 0) => {
	let hashids = new Hashids(salt, 3);

	return {
		decode(string) {
			let out = hashids.decode(string)[0];

			if (idPadding > 0) {
				return out / idPadding;
			} else {
				return out;
			}
		},

		encode(number) {
			let input;
			if (idPadding > 0) {
				input = parseInt(number) * idPadding;
			} else {
				input = parseInt(number);
			}

			return hashids.encode(input);
		}
	};
};

export default CheveretoIds;
