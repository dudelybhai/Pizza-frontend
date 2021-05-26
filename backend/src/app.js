const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const { sequelize } = require("./models");
const router = express.Router();
const routes = require("./routes/index");
const cors = require("cors");
const Emitter = require("events");
const http = require("http");

const { notFound, errorHandler } = require("./middleware");

const initalizeServer = async (app) => {
  // connect to DB
  await sequelize.authenticate();

  await sequelize.sync({ force: true });

  // await sequelize
  //   .authenticate()
  //   .then(() => {
  //     console.log("Connection has been established successfully.");
  //   })
  //   .catch((err) => {
  //     console.error("Unable to connect to the database:", err);
  //   });

  // If we are behind some reverse proxy like Nginx then we can trust this
  app.enable("trust proxy");
  // Event emitter
  const eventEmitter = new Emitter();
  app.set("eventEmitter", eventEmitter);

  app.use(cors());
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(compression());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/", routes(router));
  app.use(notFound);
  app.use(errorHandler);
  // Socket
  // const io = require("socket.io")(server);
  // io.on("connection", (socket) => {
  //   socket.on("join", (orderId) => {
  //     socket.join(orderId);
  //   });
  // });

  // eventEmitter.on("orderUpdated", (data) => {
  //   io.to(`order_${data.id}`).emit("orderUpdated", data);
  // });

  // eventEmitter.on("orderPlaced", (data) => {
  //   io.to("adminRoom").emit("orderPlaced", data);
  // });
};

module.exports = { initalizeServer };
