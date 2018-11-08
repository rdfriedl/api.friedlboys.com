import express from "express";
import { wrap } from "../lib/utils";
import model from "../model";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		return await model.albums.find(req.query);
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let album = await model.albums.find({ id: req.params.id })[0];

		if (!album) {
			throw new Error(`album ${req.params.id} dose not exist`);
		}

		return album;
	})
);

export default routes;
