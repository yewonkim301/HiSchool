const passport = require("passport");
const local = require("./localStrategy"); // 로컬서버로 로그인할때
// const kakao = require("./kakaoStrategy"); // 카카오서버로 로그인할때
const { User } = require("../models/Index");

module.exports = () => {
  console.log('passport/index.js 호출');
  passport.serializeUser((userid, done) => {
    console.log('passport/index.js serializeUser 호출');
    console.log('passport/index.js userid', userid); 
    console.log('passport/index.js done', done); 
    done(null, userid);
    console.log('완료');
  });

  passport.deserializeUser((user, done) => {
    console.log('passport/index.js deserializeUser 호출', user, done);
    User.findOne({ where: { userid: user.userid } })
      .then((user) => {
        console.log('deserializeUser');
        // console.log(user);
        console.log('deserialize 성공');
        done(null, user);
      })
      .catch((err) => {
        console.log('에러에러');
        done(err)
      });
  });

  local();
  // kakao();
};
