import Sequelize from "sequelize";
import database from "../lib/db";
import { getTableName } from "./utils/tables";
import { prefixModelFields } from "./utils/model";

const Image = database.define(
	"Image",
	prefixModelFields("image_", {
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: Sequelize.STRING,
		extension: Sequelize.STRING,
		size: Sequelize.INTEGER,
		width: Sequelize.INTEGER,
		height: Sequelize.INTEGER,
		date: Sequelize.DATE,
		date_gmt: Sequelize.DATE,
		title: Sequelize.STRING,
		description: Sequelize.TEXT,
		nsfw: Sequelize.TINYINT,
		user_id: Sequelize.STRING,
		album_id: Sequelize.STRING,
		uploader_ip: Sequelize.STRING,
		storage_mode: Sequelize.ENUM(["datefolder", "direct", "old"]),
		storage_id: Sequelize.STRING,
		md5: Sequelize.STRING,
		source_md5: Sequelize.STRING,
		original_filename: Sequelize.STRING,
		original_exifdata: Sequelize.TEXT("long"),
		views: Sequelize.STRING,
		category_id: Sequelize.STRING,
		chain: Sequelize.TINYINT,
		thumb_size: Sequelize.INTEGER,
		medium_size: Sequelize.INTEGER,
		expiration_date_gmt: Sequelize.DATE,
		likes: Sequelize.STRING,
		is_animated: Sequelize.TINYINT
	}),
	{
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: getTableName("images")
	}
);

Image.afterValidate((image, opts) => {
	image.id = Math.random();
	console.log(image.image_id);
});

export default Image;
