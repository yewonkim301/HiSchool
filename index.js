const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = require("./models/Index.js");

const cors = require("cors");
const http = require("http");
const SocketIO = require("socket.io");
// const { sequelize } = require('./models/Index.js');

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(app);
const io = SocketIO(server);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, // https 
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// passport
const passport = require("passport");
const passportConfig = require("./passport");
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

// socket

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const indexRouter = require("./routes");
const socketRouter = require("./routes/socket");

app.use("/", indexRouter);

let flag = true;
app.get("/chat", (req, res) => {
  if (flag) {
    flag = false;
    socketRouter.startSocket(io);
  }
  res.render("chat");
});

app.get("*", (req, res) => {
  res.render('404')
}); // error 페이지 ?

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 실행중`);
  });
});
