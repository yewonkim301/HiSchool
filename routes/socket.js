const controller = require("../controller/Csocket");

exports.startSocket = (io) => {
  // console.log(io);
  io.on("connection", (socket) => {
    // console.log("서버 연결 완료", socket.id);
    console.log(socket);
    controller.connection(io, socket);
  });
};
