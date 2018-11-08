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
		let image = await model.images.find({ id: req.params.id })[0];

		if (!image) {
			throw new Error(`image ${req.params.id} dose not exist`);
		}

		return image;
	})
);

export default routes;
