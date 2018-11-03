import pkg from "../package.json";
import express from "express";
import images from "./images";
import albums from "./albums";
import users from "./users";

let api = express.Router();

// mount the images resource
api.use("/images", images);
api.use("/albums", albums);
api.use("/users", users);

// perhaps expose some API metadata at the root
api.get("/", (req, res) => {
	res.json({
		version: pkg.version
	});
});

export default api;
