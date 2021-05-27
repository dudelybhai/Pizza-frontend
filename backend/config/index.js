const dotenv = require("dotenv")

const config = dotenv.config()

if (config.error) {
	throw new Error("Could not find .env file")
}

process.env.NODE_ENV = "development" || process.env.NODE_ENV

module.exports = {
	isDev: process.env.NODE_ENV === "development",
	port: parseInt(process.env.PORT, 10),
	db: {
		host: process.env.DB_HOST,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_SCHEMA,
		port: 4321,
	},
}
