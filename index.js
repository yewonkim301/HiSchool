/* eslint-disable no-console */
const express = require("express");

const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = require("./models/Index");
const dotenv = require("dotenv");
dotenv.config();


// passport
const passport = require("passport");
const passportConfig = require("./passport");



const PORT = process.env.PORT;


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);






passportConfig();

app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장
// passport.session()이 실행되면, 세션쿠키 정보를 바탕으로 해서 passport/index.js의 deserializeUser()가 실행하게 한다.



const indexRouter = require("./routes");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/auth", authRouter)


app.get("*", (req, res) => {
  console.log("error");
}); // error 페이지 ?


db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`${PORT}번 포트에서 실행중`);
  });
});
