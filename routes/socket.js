const Ccontroller = require("../controller/CclubSocket");

// exports.startSocket = (namespace1) => {
//   namespace1.on("connection", (socket) => {
//     controller.connection(namespace1, socket);
//   });
// };

exports.startClubSocket = (io) => {
  io.on("connection", (socket) => {
    Ccontroller.connection(io, socket);
  });
};
