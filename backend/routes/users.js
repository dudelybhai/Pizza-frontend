const UserController = require("../controllers/users");

module.exports = (router) => {
  router.route("/").get(UserController.welcome);
  router.route("/login").post(UserController.loginUser);
  router.route("/createuser").post(UserController.createUser);
  router.route("/userlist").get(UserController.getUsersList);
  router.route("/user/update").post(UserController.updateUser);
  router.route("/user/delete").post(UserController.deleteUser);
};
