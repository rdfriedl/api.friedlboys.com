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
	wrap(async req => {
		let images = await model.images.find({ id: req.params.id });

		if (images.length === 0) {
			throw new Error(`image ${req.params.id} dose not exist`);
		}

		return images[0];
	})
);

export default routes;
