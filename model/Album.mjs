import Sequelize from "sequelize";
import database from "../lib/db";
import { getTableName } from "./utils/tables";
import { prefixModelFields } from "./utils/model";

const Album = database.define(
	"Album",
	prefixModelFields("album_", {
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: { type: Sequelize.STRING, allowNull: false },
		user_id: { type: Sequelize.BIGINT, allowNull: false },
		date: { type: Sequelize.DATE, allowNull: false },
		date_gmt: { type: Sequelize.DATE, allowNull: false },
		creation_ip: { type: Sequelize.STRING, allowNull: false },
		privacy: {
			type: Sequelize.ENUM([
				"public",
				"password",
				"private",
				"private_but_link",
				"custom"
			]),
			defaultValue: "public"
		},
		privacy_extra: { type: Sequelize.TEXT, defaultValue: null },
		password: { type: Sequelize.TEXT, defaultValue: null },
		image_count: { type: Sequelize.BIGINT, defaultValue: 0, allowNull: false },
		description: { type: Sequelize.TEXT, defaultValue: null },
		likes: { type: Sequelize.BIGINT, defaultValue: 0, allowNull: false },
		views: { type: Sequelize.BIGINT, defaultValue: 0, allowNull: false }
	}),
	{
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: getTableName("albums")
	}
);

export default Album;
