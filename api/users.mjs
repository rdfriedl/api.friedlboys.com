import express from "express";
import { wrap, parseQuery, processResults } from "./utils";
import User from "../model/User";
import Album from "../model/Album";

let routes = express.Router();

let ID_FIELDS = ["id"];

routes.get(
	"/",
	wrap(async req => {
		let where = await parseQuery(req.query, ID_FIELDS);

		let users = await User.findAll({ where });

		return processResults(users, ID_FIELDS);
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
