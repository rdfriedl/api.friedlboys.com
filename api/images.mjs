import express from "express";
import { wrap, parseQuery, processResults } from "./utils";
import Image from "../model/Image";
import Album from "../model/Album";

let routes = express.Router();

let ID_FIELDS = ["id", "user_id", "album_id"];

routes.get(
	"/",
	wrap(async req => {
		let where = await parseQuery(req.query, ID_FIELDS);

		let images = await Image.findAll({ where });

		return processResults(images, ID_FIELDS);
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let where = parseQuery(req.params);

		let results = await Album.findAll({ where });

		return processResults(results, ID_FIELDS);
	})
);

export default routes;
