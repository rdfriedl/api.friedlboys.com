import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import initializeDb from "./db";
import createIds from "./ids";
import api from "./api";
import { createModel } from "./model/index.mjs";

dotenv.config();

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

// 3rd party middleware
app.use(
	cors({
		exposedHeaders: ["Link"]
	})
);

app.use(bodyParser.json());

// connect to db
export default async function init() {
	let db = await initializeDb();
	let model = createModel(db);
	let ids = await createIds(model);

	app.get("/health", (req, res) => {
		res.send("I am happy and healthy\n");
	});

	app.use((req, res, next) => {
		req.db = db;
		req.model = model;
		req.ids = ids;
		next();
	});

	// api router
	app.use(api);

	app.server.listen(process.env.NODE_PORT || process.env.PORT || 8080, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});

	return app;
}
