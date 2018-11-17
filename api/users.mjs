import express from "express";
import { wrap, getSequelizeQuery, processResults } from "./utils";
import User from "../model/User";

let routes = express.Router();

let ID_FIELDS = ["id"];

routes.get(
	"/",
	wrap(async req => {
		let query = await getSequelizeQuery(req.query, ID_FIELDS);

		let results = await User.findAll(query);

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

		let results = await User.findOne(query);

		return processResults(results, ID_FIELDS);
	})
);

export default routes;
