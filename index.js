/* eslint-disable no-console */
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const session = require('express-session');



var SequelizeStore = require("connect-session-sequelize")(session.Store);


const db = require("./models/Index");
const { User } = require('./models/Index.js')

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
  secret:"#JDKLF439jsdlfsjl",
  resave:false,
  saveUninitialized:true,
  // store: sessionStore
}))




// passport
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());




// socket
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);


const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));



const indexRouter = require("./routes");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/auth", authRouter);


io.on("connection", (socket) => {
  console.log("[ 서버가 연결되었습니다. ]", socket.id);


  // 클라이언트 -> 서버 통신
  socket.on("send", (data) => {
    console.log("socket send", data);
    // 메시지 전송
    // 프론트에서 메시지 보낸 사람의 userid_num 과 메세지 내용 받아와야 함
    // -> data 에 담겨 있어야 하는 정보
    // const socketId = data.id;
    const { userid_num, content } = data;
    io.emit("send", data);
    // 클라이언트에서 사용자가 입력한 정보를 페이지에 띄우기
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
