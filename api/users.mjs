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
		let users = await model.users.find({ id: req.params.id });

		if (users.length === 0) {
			throw new Error(`user ${req.params.id} dose not exist`);
		}

		return users[0];
	})
);

export default routes;
