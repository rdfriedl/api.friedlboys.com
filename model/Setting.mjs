import Sequelize from "sequelize";
import database from "../lib/db";
import { getTableName } from "./utils/tables";
import { prefixModelFields } from "./utils/model";

const Setting = database.define(
	"Setting",
	prefixModelFields("setting_", {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: { type: Sequelize.STRING, allowNull: false },
		value: Sequelize.TEXT,
		default: Sequelize.TEXT,
		typeset: Sequelize.ENUM(["string", "bool"])
	}),
	{
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: getTableName("settings")
	}
);

export default Setting;
