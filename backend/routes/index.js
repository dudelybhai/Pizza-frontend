const users = require("./users");
const menus = require("./menus");
const orders = require("./orders");

module.exports = (router) => {
  users(router);
  menus(router);
  orders(router);
  return router;
};
