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
	wrap(async (req, res) => {
		let users = await model.users.find({ id: req.params.id });

		if (users.length === 0) {
			res.status(404).end();
		}

		return users[0];
	})
);

export default routes;
