const OrderController = require("../controllers/orders");

module.exports = (router) => {
  router.route("/createorder").post(OrderController.createOrder);
  router.route("/orderlist").get(OrderController.getOrdersList);
  router.route("/orderlist/:id").get(OrderController.getOrdersListByUserId);
  router
    .route("/orderstatus/update")
    .put(OrderController.updateOrderStatusByOrderId);
};
