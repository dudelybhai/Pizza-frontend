const MenuController = require("../controllers/menus");

module.exports = (router) => {
  router.route("/createmenu").post(MenuController.createMenu);
  // router.route("/bulkmenu").post(MenuController.bulkMenu);
  router.route("/menulist").get(MenuController.getMenuList);
  router.route("/menu/update").post(MenuController.updateMenu);
  router.route("/menu/delete").post(MenuController.deleteMenu);
};
