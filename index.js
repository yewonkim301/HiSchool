/* eslint-disable no-console */
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const bodyParser = require('body-parser');
const passport = require('passport');
app.use(bodyParser.urlencoded({ extended: false }));

require('./middleware/auth.js')()



const { User } = require('./models/Index.js')
const accountController = require('./controller/Caccount')
const LocalStrategy = require('passport-local');


// passport
// passport.use(new LocalStrategy(User.authenticate()));

passport.use(new LocalStrategy(
  function(userid, password, done) {
    User.findOne({ userid: userid }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {    
	console.log('serialize');    
	done(null, user);
});

// passport.serializeUser(User.serializeUser());
app.use(passport.initialize());


app.get('/profile', passport.authenticate('jwt', { session: false }), accountController.profile)
app.post('/login', passport.authenticate('local'), accountController.login)
app.post('/register', accountController.register)





const db = require("./models/Index");
const dotenv = require("dotenv");
dotenv.config();

// socket
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

// passport
const passport = require("passport");
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
