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
	wrap(async (req, res) => {
		let albums = await model.albums.find({ id: req.params.id });

		if (albums.length === 0) {
			res.status(404).end();
		}

		return albums[0];
	})
);

export default routes;
