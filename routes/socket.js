const controller = require("../controller/Csocket");
const Ccontroller = require("../controller/CclubSocket");

exports.startSocket = (namespace1) => {
  namespace1.on("connection", (socket) => {
    controller.connection(namespace1, socket);
  });
};

exports.startClubSocket = (namespace2) => {
  namespace2.on("connection", (socket) => {
    Ccontroller.connection(namespace2, socket);
  });
};
