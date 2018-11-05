import express from "express";
import { removePropertyPrefix, wrap } from "../utils/utils.mjs";

let routes = express.Router();

routes.get(
	"/",
	wrap(async req => {
		let albums = await req.model.albums.find(req.query);

		albums.forEach(album => (album.id = req.ids.encode(album.id)));

		return albums.map(album => removePropertyPrefix(album, "album_"));
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let albumId = req.ids.decode(req.params.id);
		let album = await req.model.albums.find({ id: albumId })[0];

		if (!album) {
			throw new Error(`album ${req.params.id} dose not exist`);
		}

		album.id = req.ids.encode(album.id);

		return album;
	})
);

export default routes;
