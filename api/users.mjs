import express from "express";
import { removePropertyPrefix, wrap } from "../utils/utils.mjs";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		let users = await req.model.users.find(req.query);

		users.forEach(user => (user.id = req.ids.encode(user.id)));

		return users.map(user => removePropertyPrefix(user, "user_"));
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let userId = req.ids.decode(req.params.id);
		let user = await req.model.users.find({ id: userId })[0];

		if (!user) {
			throw new Error(`user ${req.params.id} dose not exist`);
		}

		user.id = req.ids.encode(user.id);

		return user;
	})
);

export default routes;
