import Sequelize from "sequelize";

const { Op } = Sequelize;
const operatorsAliases = {
	$eq: Op.eq,
	$ne: Op.ne,
	$gte: Op.gte,
	$gt: Op.gt,
	$lte: Op.lte,
	$lt: Op.lt,
	$not: Op.not,
	$in: Op.in,
	$notIn: Op.notIn,
	$is: Op.is,
	$like: Op.like,
	$notLike: Op.notLike,
	$iLike: Op.iLike,
	$notILike: Op.notILike,
	$regexp: Op.regexp,
	$notRegexp: Op.notRegexp,
	$iRegexp: Op.iRegexp,
	$notIRegexp: Op.notIRegexp,
	$between: Op.between,
	$notBetween: Op.notBetween,
	$overlap: Op.overlap,
	$contains: Op.contains,
	$contained: Op.contained,
	$adjacent: Op.adjacent,
	$strictLeft: Op.strictLeft,
	$strictRight: Op.strictRight,
	$noExtendRight: Op.noExtendRight,
	$noExtendLeft: Op.noExtendLeft,
	$and: Op.and,
	$or: Op.or,
	$any: Op.any,
	$all: Op.all,
	$values: Op.values,
	$col: Op.col
};

let database = new Sequelize(
	process.env.CHEVERETO_DB_NAME || process.env.CHEVERETO_DB_DATABASE,
	process.env.CHEVERETO_DB_USER || process.env.CHEVERETO_DB_USERNAME,
	process.env.CHEVERETO_DB_PASS || process.env.CHEVERETO_DB_PASSWORD,
	{
		host: process.env.CHEVERETO_DB_HOST,
		dialect: "mysql",
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
		operatorsAliases
	}
);

export default database;
