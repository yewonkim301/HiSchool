const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/Index");

const dotenv = require("dotenv").config();
const { getSignedFileUrl } = require("../middleware/s3");


exports.getRegister = async (req, res, next) => {
  res.render("register", { link: '/'});
}

exports.postRegister = async (req, res, next) => {
  const {
    userid,
    password,
    school,
    phone,
    birthday,
    name,
    grade,
    classid,
    profile_img,
  } = req.body;

  // console.log("profile_img : ", profile_img);

  try {
    const exUser = await User.findOne({ where: { userid: userid } });
    if (exUser) {
      // console.log("join Error : 이미 가입된 아이디입니다");
      return res.send("이미 가입된 아이디입니다");
      return res.redirect("/register");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      userid,
      school,
      phone,
      profile_img,
      nickname: Math.random().toString(36).substring(2, 12),
      birthday,
      name,
      grade,
      classid,
      password: hash,
    });
    return res.send({ success: true, message: "회원가입 성공" });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};




exports.postLogin = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // console.log("/login user : ", user);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // console.log("유저가 존재하지 않습니다");
      return res.send("유저 정보가 일치하지 않습니다");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        // console.log("로그인 에러");
        return next(loginError);
      }

      const payload = {
        userid: req.body.userid,
        userid_num: user.userid_num,
      };

      const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

      return (
        res
          .cookie("jwt", token, {
            httpOnly: true,
            secure: false, // https 사용시 true 설정해줄것
            maxAge: 1000 * 60 * 60 * 24 * 7,
          })
          .status(200)
          .send({ isLoggedIn: true })
      );
    });
  })(req, res, next);
};

exports.getLogout = async(req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); 
      res.clearCookie("jwt");
      res.redirect('/'); 
    });
  });
}



exports.s3upload = async (req, res) => {
  // printLog()

  if (req.method === "POST") {
    try {
      let { name, type } = req.body;
      const fileParams = {
        name: name,
        type: type,
      };
      // console.log("fileParams : ", fileParams);

      const signedUrl = await getSignedFileUrl(fileParams);
      // console.log("signedUrl : ", signedUrl);
      return res.send(signedUrl);
    } catch (e) {
      return res.status(500).send({
        message: "make url failed",
      });
    }
  }
};
