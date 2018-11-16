import express from "express";
import { wrap, parseQuery, processResults } from "./utils";
import Album from "../model/Album";

let routes = express.Router();

let ID_FIELDS = ["id", "user_id"];

routes.get(
	"/",
	wrap(async req => {
		let where = await parseQuery(req.query, ID_FIELDS);

		let results = await Album.findAll({ where });

		return processResults(results, ID_FIELDS);
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
