/* eslint-disable no-console */
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const db = require('./models/Index.js');
// const { sequelize } = require('./models/Index.js');




const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키를 활성화하는 코드
app.use(session({  // 메모리 세션을 활성화하는 코드
    resave:false, // 세션 객체에 수정사항이 없어도 저장할까를 정하는 코드
    saveUninitialized:false, // 처음의 빈 세션 객체라도 저장을 할지말지 정하는 코드
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false, // https를 쓸것인가?
    },
}));


app.use(session({
  secret:"#JDKLF439jsdlfsjl",
  resave:false,
  saveUninitialized:true,
  // store: sequelizeSessionStore,
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
