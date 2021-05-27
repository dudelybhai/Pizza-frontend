const { Sequelize, DataTypes } = require("sequelize");
const { db } = require("../config");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: db.host,
  database: db.name,
  username: db.username,
  password: db.password,
  logging: console.log
});

const models = {
  User: require("./users")(sequelize, DataTypes),
  Menu: require("./menus")(sequelize, DataTypes),
  Order: require("./orders")(sequelize, DataTypes)
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };
