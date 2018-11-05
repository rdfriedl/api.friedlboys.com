import imagesModel from "./images.mjs";
import albumsModel from "./albums.mjs";
import usersModel from "./users.mjs";
import settingsModel from "./settings.mjs";

export function createModel(db) {
	return {
		images: imagesModel(db),
		albums: albumsModel(db),
		users: usersModel(db),
		settings: settingsModel(db)
	};
}
