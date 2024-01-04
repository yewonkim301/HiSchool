const controller = require("../controller/Csocket");
const Ccontroller = require("../controller/CclubSocket");

exports.startSocket = (io2) => {
  io2.on("connection", (socket) => {
    controller.connection(io2, socket);
  });
};

exports.startClubSocket = (io) => {
  io.on("connection", (socket) => {
    Ccontroller.connection(io, socket);
  });
};
