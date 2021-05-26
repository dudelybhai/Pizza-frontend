const menu = (sequelize, DataTypes) => {
  const Menu = sequelize.define("menu", {
    pkMenuId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "pk_menu_id",
      default: sequelize.fn("uuid_generate_v4"),
      autoIncrement: true
    },
    pizzaName: {
      type: DataTypes.STRING,
      required: true,
      unique: "compositeIndex",
      allowNull: false,
      validate: {
        notNull: { msg: "Menu must have a pizza name" },
        notEmpty: { msg: "Pizza name must not be empty" }
      }
    },
    pizzaImage: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      validate: {
        notNull: { msg: "Menu must have a pizza image" },
        notEmpty: { msg: "Pizza image must not be empty" }
      }
    },
    pizzaSize: {
      type: DataTypes.STRING,
      required: true,
      unique: "compositeIndex",
      allowNull: false,
      validate: {
        notNull: { msg: "Menu must have a pizza Size" },
        notEmpty: { msg: "Pizza size must not be empty" }
      }
    },
    pizzaPrice: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
      validate: {
        notNull: { msg: "Menu must have a pizza price" },
        notEmpty: { msg: "Pizza price must not be empty" }
      }
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      validate: {
        notNull: { msg: "Menu must have a stock quantity" },
        notEmpty: { msg: "stock  must not be empty" }
      }
    }
  });

  Menu.associate = () => {};

  return Menu;
};

module.exports = menu;
