import express from "express";
import { removePropertyPrefix, wrap } from "../utils.mjs";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		let albums = await req.model.albums.find(req.query);

		return albums.map(album => removePropertyPrefix(album, "album_"));
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let album = await req.model.albums.find({ id: req.params.id })[0];

		if (!album) {
			throw new Error(`album ${req.params.id} dose not exist`);
		}
		return album;
	})
);

export default routes;
