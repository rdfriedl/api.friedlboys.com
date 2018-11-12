import express from "express";
import { wrap } from "../lib/utils";
import model from "../model";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		return await model.images.find(req.query);
	})
);

routes.get(
	"/:id",
	wrap(async (req, res) => {
		let images = await model.images.find({ id: req.params.id });

		if (images.length === 0) {
			res.status(404).end();
		}

		return images[0];
	})
);

export default routes;
