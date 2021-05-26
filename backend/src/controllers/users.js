const { models } = require("../models");
const bcrypt = require("bcrypt");
exports.welcome = async function (req, res, next) {
  try {
    return res.status(200).render("index");
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    let emailExists = await models.User.findOne({
      where: {
        email
      }
    });

    if (emailExists) {
      return res.send({
        status: 400,
        message: "An account with that email already exists"
      });
    }
    models.User.beforeCreate((user, options) => {
      return bcrypt
        .hash(user.password, 10)
        .then((hash) => {
          user.password = hash;
        })
        .catch((err) => {
          throw new Error();
        });
    });

    let newUser = await models.User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });
    return res
      .status(200)
      .send({ data: newUser, message: "User created successfully" });
  } catch (err) {
    return res.status(500).send({ message: `Error: ${err.message}` });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await models.User.findOne({
      where: {
        email
      }
    });

    console.log(user);
    if (user) {
      var passwordIsValid = bcrypt.compareSync(password, user.password);
      console.log(passwordIsValid);
      if (!passwordIsValid) {
        return res
          .status(400)
          .send({ message: "Please enter a valid password" });
      }
    } else {
      return res.status(400).send({ message: "account does not exist" });
    }

    return res.status(200).send({ data: user, message: "Login successfully" });
  } catch (err) {
    return res.status(500).send({ message: `Error: ${err.message}` });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { pkUserId } = req.body;
    if (!pkUserId) {
      return res.status(400).send({
        message: "Please provide a id for the user you are trying to delete!"
      });
    }

    const user = await models.User.findOne({
      where: {
        pkUserId
      }
    });

    if (!user) {
      return res.status(400).send({
        message: `No user found with the id ${pkUserId}`
      });
    }

    await user.destroy();
    return res.send({
      message: `User ${pkUserId} has been deleted!`
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { pkUserId, firstName, lastName, email, role } = req.body;

    const user = await models.User.findOne({
      where: {
        pkUserId
      }
    });

    if (!user) {
      return res.status(400).send({
        message: `No user found with the id ${pkUserId}`
      });
    }

    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      user.email = email;
    }
    if (role) {
      user.role = role;
    }

    user.save();
    return res.send({
      message: `User ${pkUserId} has been updated!`,
      data: user
    });
  } catch (err) {
    return res.status(500).send({
      message: `Error: ${err.message}`
    });
  }
};

exports.getUsersList = async function (req, res, next) {
  try {
    let userList = await models.User.findAll({});
    return res.status(200).json({ data: userList });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
};

/*validation*/
