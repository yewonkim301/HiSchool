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
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);


const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));




const indexRouter = require("./routes");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/auth", authRouter);



io.on('connection', (socket) => {
  console.log('[ 서버가 연결되었습니다. ]', socket.id );

  // 클라이언트 -> 서버 통신
  socket.on('forServer', (data) => {

    // 메시지 전송
    const socketId = data.id;
  })
})




















app.get("*", (req, res) => {
  // console.log("error");
}); // error 페이지 ?

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 실행중`);
  });
});
