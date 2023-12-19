/* eslint-disable no-console */
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bodyParser = require("body-parser");
const passport = require("passport");
app.use(bodyParser.urlencoded({ extended: false }));

require("./middleware/auth.js")();

const { User } = require("./models/Index.js");
const accountController = require("./controller/Caccount");
const LocalStrategy = require("passport-local");

// passport
// passport.use(new LocalStrategy(User.authenticate()));

passport.use(
  new LocalStrategy(function (userid, password, done) {
    User.findOne({ userid: userid }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  console.log("serialize");
  done(null, user);
});

// passport.serializeUser(User.serializeUser());
app.use(passport.initialize());

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  accountController.profile
);
app.post("/login", passport.authenticate("local"), accountController.login);
app.post("/register", accountController.register);

const db = require("./models/Index");
const dotenv = require("dotenv");
dotenv.config();

// socket
const { Club_chat } = require("./models/Index");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

// passport
const passportConfig = require("./passport");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   })
// );

const indexRouter = require("./routes");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/auth", authRouter);

/*
io.on("connection", (socket) => {
  console.log("[ 서버가 연결되었습니다. ]", socket.id);

  // 클라이언트 -> 서버 통신
  socket.on("send", (club_id) => {
    console.log("socket send", club_id);
    // 메시지 전송
    // 프론트에서 메시지 보낸 사람의 userid_num 과 메세지 내용 받아와야 함
    // -> data 에 담겨 있어야 하는 정보
    // const socketId = data.id;
    const { userid_num, content } = data;
    io.to(club_id).emit("send", data);
    // 클라이언트에서 사용자가 입력한 정보를 페이지에 띄우기
  });
});
*/
io.on("connection", (socket) => {
  console.log("[ 서버가 연결되었습니다. ]", socket.id);

  // 클라이언트 -> 서버 통신
  socket.on("send", async (data) => {
    console.log("socket send", data);

    try {
      const { club_id, userid_num, content } = data;

      // 프론트에서 세션에 저장되어 있는 userid_num 값을 찾아서 from_name에 담아서 보내줌
      const from_realName = await User.findOne({
        attributes: ["name"],
        where: { userid_num: userid_num },
      });

      // 데이터베이스에 채팅 내용 저장
      const newClubChat = await Club_chat.create({
        club_id: club_id,
        from_name: from_realName.name,
        content: content,
      });

      // 클라이언트에 메시지 전송
      io.to(club_id).emit("send", {
        club_id: club_id,
        from_name: from_realName.name,
        content: content,
      });
    } catch (err) {
      console.error(err);
      // 에러 처리
    }
  });
});

app.get("*", (req, res) => {
  // console.log("error");
}); // error 페이지 ?

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 실행중`);
  });
});

/*
socket의 listen 부분이 어디로 들어가야 하는지
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})
*/
