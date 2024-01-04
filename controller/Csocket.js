const { User, Dm } = require("../models/Index");

const roomList2 = [];
exports.connection = (namespace1, socket) => {
  console.log("접속 :", socket.id);

  //채팅방 목록 보내기
  socket.emit("roomList2", roomList2);

  //채팅방 만들기 생성
  socket.on("create", async (roomName2, userName, cb) => {
    //join(방이름) 해당 방이름으로 없다면 생성. 존재하면 입장
    //socket.rooms에 socket.id값과 방이름 확인가능
    socket.to(roomName2).emit("notice", `${userName}님이 입장하셨습니다`);
    socket.join(roomName2);
    //socket은 객체이며 원하는 값을 할당할 수 있음
    socket.room = roomName2;
    socket.user = userName;

    //채팅방 목록 갱신
    if (!roomList2.includes(roomName2)) {
      roomList2.push(roomName2);
      //갱신된 목록은 전체가 봐야함 <=== 나와 상대방만 봐야해서 이제 바꿔야함
      namespace1.emit("roomList2", roomList2);
    }
    // const usersInRoom = getUsersInRoom(roomName2);
    // io.to(roomName2).emit('userList', usersInRoom);
    cb();
  });
  //================ 위 까지 방만들기 =======================
  socket.on("sendMessage", async (message) => {
    console.log(">>>>>>>>>>>", message);
    console.log("Csocket Message From Nick >>>>", message.from_nick);
    const NewChatMessage = await Dm.create({
      dm_content: message.message,
      room_name: message.room,
      userid_num: message.userid_num,
      from_nick: message.from_nick,
    });
    console.log("NEW CHAT MESSAGE>>>>>>>>>>>>", NewChatMessage.dm_content);
    namespace1
      .to(socket.room)
      .emit("newMessage", NewChatMessage, NewChatMessage.from_nick);
  });

  socket.on("disconnect", () => {
    if (socket.room) {
      socket.leave(socket.room);
      console.log("연결 해제");
    }
  });
};
