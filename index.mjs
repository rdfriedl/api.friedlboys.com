import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import initializeDb from "./db";
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
initializeDb().then(db => {
	let model = createModel(db);

	app.use((req, res, next) => {
		req.db = db;
		req.model = model;
		next();
	});

	// api router
	app.use(api);

	app.server.listen(process.env.NODE_PORT || process.env.PORT || 8080, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
