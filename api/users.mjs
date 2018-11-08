import express from "express";
import { wrap } from "../lib/utils";
import model from "../model";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		return await model.users.find(req.query);
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let user = await model.users.find({ id: req.params.id })[0];

		if (!user) {
			throw new Error(`user ${req.params.id} dose not exist`);
		}

		return user;
	})
);

export default routes;
