import express from "express";
import { wrap, getSequelizeQuery, processResults } from "./utils";
import Album from "../model/Album";

let routes = express.Router();

let ID_FIELDS = ["id", "user_id"];

routes.get(
	"/",
	wrap(async req => {
		let query = await getSequelizeQuery(req.query, ID_FIELDS);

		let results = await Album.findAll(query);

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

		let results = await Album.findOne(query);

		return processResults(results, ID_FIELDS);
	})
);

export default routes;
