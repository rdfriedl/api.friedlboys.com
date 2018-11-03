import express from "express";
import { removePropertyPrefix, wrap } from "../utils.mjs";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		let users = await req.model.users.find(req.query);

		return users.map(user => removePropertyPrefix(user, "user_"));
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let user = await req.model.users.find({ id: req.params.id })[0];

		if (!user) {
			throw new Error(`user ${req.params.id} dose not exist`);
		}
		return user;
	})
);

export default routes;
