const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models/Index");


module.exports = () => {
  console.log('localStrategy.js 호출');
  passport.use(
    new localStrategy(
      {
        usernameField: "userid",
        passwordField: "password",
      },
      async (userid, password, done) => {
        console.log(userid, password, done);
        try {
          const exUser = await User.findOne({ 
            where: { 
              userid: userid,
            } 
          });
          console.log('exUser:', exUser);
          if (exUser) {
            console.log(exUser);
            const result = await bcrypt.compare(password, exUser.password);
            console.log('일치하는 회원정보 확인 완료');
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            console.log('오류 : 가입되지 않은 회원');
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
