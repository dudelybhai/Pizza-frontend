const order = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    pkOrdersId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "pk_order_id",
      default: sequelize.fn("uuid_generate_v4"),
      autoIncrement: true
    },
    cartItems: {
      type: DataTypes.TEXT,
      required: true
    },
    orderBy: {
      type: DataTypes.STRING,
      required: true
    },
    address: {
      type: DataTypes.STRING,
      required: true
    },

    cardNumber: {
      type: DataTypes.BIGINT,
      required: true,
      validate: {
        isCreditCard: true
      }
    },

    cardCvv: {
      type: DataTypes.INTEGER,
      required: true
    },
    expiryMonth: {
      type: DataTypes.INTEGER,
      required: true
    },
    expiryYear: {
      type: DataTypes.INTEGER,
      required: true
    },
    total: {
      type: DataTypes.INTEGER,
      required: true
    },
    orderStatus: {
      type: DataTypes.ENUM("new", "preparing", "delivering", "delivered"),
      defaultValue: "new"
    }
  });

  Order.associate = (models) => {
    // Order.belongsTo(models.Menu, {
    //   foreignKey: "pkMenuId"
    // });
    Order.belongsTo(models.User, {
      foreignKey: "pk_user_id"
    });
  };

  return Order;
};

module.exports = order;
