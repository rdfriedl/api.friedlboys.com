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
		let albums = await model.albums.find({ id: req.params.id });

		if (albums.length === 0) {
			throw new Error(`album ${req.params.id} dose not exist`);
		}

		return albums[0];
	})
);

export default routes;
