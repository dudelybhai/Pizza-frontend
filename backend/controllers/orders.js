const { models } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const {
      pk_user_id,
      cartItems,
      orderBy,
      address,
      cardNumber,
      cardCvv,
      expiryMonth,
      expiryYear,
      orderStatus,
      total
    } = req.body;
    let newOrder = await models.Order.create({
      pk_user_id,
      cartItems,
      orderBy,
      address,
      cardNumber,
      cardCvv,
      expiryMonth,
      expiryYear,
      orderStatus,
      total
    });
    return res
      .status(200)
      .send({ data: newOrder, message: "Order created successfully" });
  } catch (err) {
    return res.status(500).send({ message: `Error: ${err.message}` });
  }
};
// exports.createBulkMenu = async (req, res) => {
//   try {
//     const { pizzaName, pizzaPrice, pizzaSize, pizzaImage } = req.body;
//     let newMenu = await models.Menu.bulkCreate({
//       pizzaName,
//       pizzaPrice,
//       pizzaSize,
//       pizzaImage
//     });
//     return res
//       .status(200)
//       .send({ data: newMenu, message: "Bulk Menu created successfully" });
//   } catch (err) {
//     return res.status(500).send({ message: `Error: ${err.message}` });
//   }
// };

exports.getOrdersList = async function (req, res, next) {
  try {
    let orderList = await models.Order.findAll({});

    return res.status(200).send(orderList);
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getOrdersListByUserId = async function (req, res, next) {
  try {
    let orderList = await models.Order.findAll({
      where: {
        pk_user_id: req.params.id
      }
    });

    return res.status(200).send(orderList);
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateOrderStatusByOrderId = async (req, res) => {
  try {
    const { pkOrdersId, orderStatus } = req.body;
    const order = await models.Order.findOne({
      where: {
        pkOrdersId
      }
    });

    if (!order) {
      return res.status(400).send({
        message: `No order found with the id ${pkOrdersId}`
      });
    }

    if (order.orderStatus === "new" && orderStatus === "preparing") {
      order.orderStatus = orderStatus;
    } else if (
      order.orderStatus === "preparing" &&
      orderStatus === "delivering"
    ) {
      order.orderStatus = orderStatus;
    } else if (
      order.orderStatus === "delivering" &&
      orderStatus === "delivered"
    ) {
      order.orderStatus = orderStatus;
    } else {
      return res.status(400).send({ message: "Status Cannot be Updated" });
    }
    order.save();
    return res.send({
      message: `Order ${orderStatus} has been updated!`,
      data: order
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`
    });
  }
};

// eventEmitter.on("orderPlaced", (data) => {
//   io.to("adminRoom").emit("orderPlaced", data);
// });

// exports.deleteMenu = async (req, res) => {
//   try {
//     const { pkMenuId } = req.body;
//     if (!pkMenuId) {
//       return res.status(400).send({
//         message: "Please provide a id for the menu you are trying to delete!"
//       });
//     }

//     const menu = await models.Menu.findOne({
//       where: {
//         pkMenuId
//       }
//     });

//     if (!menu) {
//       return res.status(400).send({
//         message: `No menu found with the id ${pkMenuId}`
//       });
//     }

//     await menu.destroy();
//     return res.send({
//       message: `Menu ${pkMenuId} has been deleted!`
//     });
//   } catch (err) {
//     return res.status(500).send({
//       message: `Error: ${err.message}`
//     });
//   }
// };
