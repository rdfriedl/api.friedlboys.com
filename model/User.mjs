import Sequelize from "sequelize";
import database from "../lib/db";
import { getTableName } from "./utils/tables";
import { prefixModelFields } from "./utils/model";

const User = database.define(
	"User",
	prefixModelFields("user_", {
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: Sequelize.STRING,
		username: { type: Sequelize.STRING, allowNull: false },
		date: { type: Sequelize.DATE, allowNull: false },
		date_gmt: { type: Sequelize.DATE, allowNull: false },
		email: Sequelize.STRING,
		avatar_filename: Sequelize.STRING,
		facebook_username: Sequelize.STRING,
		twitter_username: Sequelize.STRING,
		website: Sequelize.STRING,
		background_filename: Sequelize.STRING,
		bio: Sequelize.STRING,
		timezone: Sequelize.STRING,
		language: Sequelize.STRING,
		status: {
			type: Sequelize.ENUM([
				"valid",
				"awaiting-confirmation",
				"awaiting-email",
				"banned"
			]),
			allowNull: false
		},
		is_admin: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 },
		is_private: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 },
		newsletter_subscribe: {
			type: Sequelize.TINYINT,
			allowNull: false,
			defaultValue: 1
		},
		show_nsfw_listings: {
			type: Sequelize.TINYINT,
			allowNull: false,
			defaultValue: 0
		},
		image_count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
		album_count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
		image_keep_exif: {
			type: Sequelize.TINYINT,
			allowNull: false,
			defaultValue: 1
		},
		image_expiration: { type: Sequelize.STRING, defaultValue: null },
		registration_ip: { type: Sequelize.STRING, allowNull: false },
		likes: { type: Sequelize.BIGINT, allowNull: false, defaultValue: 0 },
		liked: { type: Sequelize.BIGINT, allowNull: false, defaultValue: 0 },
		following: { type: Sequelize.BIGINT, allowNull: false, defaultValue: 0 },
		followers: { type: Sequelize.BIGINT, allowNull: false, defaultValue: 0 },
		content_views: {
			type: Sequelize.BIGINT,
			allowNull: false,
			defaultValue: 0
		},
		notifications_unread: {
			type: Sequelize.BIGINT,
			allowNull: false,
			defaultValue: 0
		}
	}),
	{
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: getTableName("users")
	}
);

User.afterValidate((user, opts) => {
	user.id = Math.random();
	console.log(user.user_id);
});

export default User;
