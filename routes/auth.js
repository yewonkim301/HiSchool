const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const { User } = require("./../models/Index");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const router = express.Router();

// 회원 가입
router.post("/register", isNotLoggedIn, async (req, res, next) => {
  const { userid, password, school, phone, birthday, name, grade, classid } =
    req.body;

  try {
    const exUser = await User.findOne({ where: { userid: userid } });
    if (exUser) {
      console.log("join Error : 이미 가입된 아이디입니다");
      return res.send("이미 가입된 아이디입니다");
      return res.redirect("/register");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      userid,
      school,
      phone,
      profile_img: "tmp",
      nickname: "tmp",
      birthday,
      name,
      grade,
      classid,
      password: hash,
    });
    return res.send("회원가입 성공");
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      console.log("유저가 존재하지 않습니다");
      return res.send("유저 정보가 일치하지 않습니다");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        console.log('로그인 에러');
        return next(loginError);
      }
      // return res.redirect("/");

      const token = jwt.sign(
        { userid: req.body.userid },
        process.env.JWT_SECRET, {
          expiresIn: "1w"
        }
      );

      return res.send({ isLoggedIn:true, token: token });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req,res,next)를 붙인다.
});



//로그아웃
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
