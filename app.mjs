import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { getConn } from "./lib/db";
import api from "./api";

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
	app.get("/health", (req, res) => {
		res.send("I am happy and healthy\n");
	});

	app.use((req, res, next) => {
		getConn()
			.then(db => {
				req.db = db;
				next();
			})
			.catch(next);
	});

	// api router
	app.use(api);

	app.server.listen(process.env.NODE_PORT || process.env.PORT || 8080, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});

	return app;
}
