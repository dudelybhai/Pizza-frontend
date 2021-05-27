const { models } = require("../models");

exports.createMenu = async (req, res) => {
  try {
    const { pizzaName, pizzaPrice, pizzaSize, pizzaImage, countInStock } =
      req.body;
    let newMenu = await models.Menu.create({
      pizzaName,
      pizzaPrice,
      pizzaSize,
      pizzaImage,
      countInStock
    });
    return res
      .status(200)
      .send({ data: newMenu, message: "Menu created successfully" });
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

exports.getMenuList = async function (req, res, next) {
  try {
    let menuList = await models.Menu.findAll({});
    console.log(menuList);
    return res.status(200).send(menuList);
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const {
      pkMenuId,
      pizzaName,
      pizzaPrice,
      pizzaSize,
      pizzaImage,
      countInStock
    } = req.body;
    const menu = await models.Menu.findOne({
      where: {
        pkMenuId
      }
    });

    if (!menu) {
      return res.status(400).send({
        message: `No user found with the id ${pkMenuId}`
      });
    }

    if (pizzaName) {
      menu.pizzaName = pizzaName;
    }
    if (pizzaSize) {
      menu.pizzaSize = pizzaSize;
    }
    if (pizzaImage) {
      menu.pizzaImage = pizzaImage;
    }
    if (pizzaPrice) {
      menu.pizzaPrice = pizzaPrice;
    }
    if (countInStock) {
      menu.pizzaPrice = countInStock;
    }

    menu.save();
    return res.send({
      message: `Menu ${pkMenuId} has been updated!`,
      data: menu
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`
    });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { pkMenuId } = req.body;
    if (!pkMenuId) {
      return res.status(400).send({
        message: "Please provide a id for the menu you are trying to delete!"
      });
    }

    const menu = await models.Menu.findOne({
      where: {
        pkMenuId
      }
    });

    if (!menu) {
      return res.status(400).send({
        message: `No menu found with the id ${pkMenuId}`
      });
    }

    await menu.destroy();
    return res.send({
      message: `Menu ${pkMenuId} has been deleted!`
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`
    });
  }
};
