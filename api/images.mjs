import express from "express";
import { removePropertyPrefix, wrap } from "../utils/utils.mjs";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		let images = await req.model.images.find(req.query);

		images.forEach(image => (image.id = req.ids.encode(image.id)));

		return images.map(image => removePropertyPrefix(image, "image_"));
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let imageId = req.ids.decode(req.params.id);
		let image = await req.model.images.find({ id: imageId })[0];

		if (!image) {
			throw new Error(`image ${req.params.id} dose not exist`);
		}

		image.id = req.ids.encode(image.id);

		return image;
	})
);

export default routes;
