import express from "express";
import { wrap, getSequelizeQuery, processResults } from "./utils";
import Image from "../model/Image";

let routes = express.Router();

let ID_FIELDS = ["id", "user_id", "album_id"];

routes.get(
	"/",
	wrap(async req => {
		let query = await getSequelizeQuery(req.query, ID_FIELDS);

		let results = await Image.findAll(query);

		return processResults(results, ID_FIELDS);
	})
);

routes.get(
	"/:id",
	wrap(async req => {
		let query = await getSequelizeQuery(
			{ where: { id: req.params.id } },
			ID_FIELDS
		);

		let results = await Image.findOne(query);

		return processResults(results, ID_FIELDS);
	})
);

export default routes;
