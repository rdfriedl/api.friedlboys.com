import express from "express";
import { removePropertyPrefix, wrap } from "../utils.mjs";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		let images = await req.model.images.find(req.query);

		return images.map(image => removePropertyPrefix(image, "image_"));
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let image = await req.model.images.find({ id: req.params.id })[0];

		if (!image) {
			throw new Error(`image ${req.params.id} dose not exist`);
		}
		return image;
	})
);

export default routes;
