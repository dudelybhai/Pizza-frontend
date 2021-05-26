const bcrypt = require("bcrypt");
const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      pkUserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "pk_user_id",
        default: sequelize.fn("uuid_generate_v4"),
        autoIncrement: true
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a first name" },
          notEmpty: { msg: "first name must not be empty" }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a last name" },
          notEmpty: { msg: "last name must not be empty" }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "email must not be empty" },
          isEmail: { msg: "Must be a valid email address" }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a password" },
          notEmpty: { msg: "password must not be empty" }
        }
      }
      // role: {
      //   type: DataTypes.ENUM("user", "admin"),
      //   allowNull: false,
      //   required: true,
      //   validate: {
      //     notNull: { msg: "User must have a role" },
      //     notEmpty: { msg: "role must not be empty" }
      //   }
      // }
    },
    {
      instanceMethods: {
        generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
          return bcrypt.compare(password, this.password);
        }
      }
    }
  );

  User.associate = () => {};

  return User;
};

module.exports = user;
