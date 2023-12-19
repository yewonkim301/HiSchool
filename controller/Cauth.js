const { User } = require("../models/Index");

const passport = require("passport");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()




exports.handleRegister = async (req, res, next) => {
  console.log("회원가입 요청 처리 시작");
  const { userid, name, school, grade, classid, birthday, phone, password } =
    req.body;
  console.log(userid, name, school, grade, classid, birthday, phone, password);
  try {
    const exUser = await User.findOne({ where: { userid: userid } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        userid,
        name,
        school,
        grade,
        classid,
        birthday,
        phone,
        password: hash,
        profile_img: 'temp',
        nickname: 'temp',
      });
      return res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};



exports.handleLogin = async (req, res, next) => {
  console.log('Cauth.js handleLogin() 호출');
  passport.authenticate("local", (authError, user, info)=>{
    console.log('passport.authenticate 호출');
    if(authError){
      console.log('auth 오류');
      console.error(authError);
      return next(authError);
    }
    console.log('auth 성공');
    console.log(user);
    if (!user){
      console.log('user 실패');
      return res.redirect(`/?loginError=${info.message}`)
    }
    console.log('user 성공');
    return req.login(user, (loginError) => {
      console.log('req.login 호출');
      if(loginError) {
        console.log('로그인 에러');
        console.error(loginError); 

        return next(loginError);
      }
      console.log('로그인 성공');



      const token = jwt.sign(
        { userid: user.userid },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.json({ message: "로그인 성공", token });


      // return res.redirect('/');
      // const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET, {expiresIn: '7d'});
      // console.log('토큰 생성 완료', token);



      // // 해당 유저에게 token값 할당 후 저장
      // user.token = token;
      // console.log('토큰 할당');

      // console.log('로그인 처리 완료, 자료 보내기 전');
      //   return res
      //     .cookie("x_auth", user.token, {
      //       maxAge: 1000 * 60 * 60 * 24 * 7, // 7일간 유지
      //       httpOnly: true,
      //     })
      //     .status(200)
      //     .json({ loginSuccess: true, userid: user.userid, userid_num: user.userid_num });


      // user.save((error, user) => {
      //   if (error) {
      //     console.log('뭔가 잘못됨');
      //     return res.status(400).json({ error: "something wrong" });
      //   }

      //   // DB에 token 저장한 후에는 cookie에 토큰을 저장하여 이용자를 식별합니다.
        
      //   console.log('로그인 처리 완료, 자료 보내기 전');
      //   return res
      //     .cookie("x_auth", user.token, {
      //       maxAge: 1000 * 60 * 60 * 24 * 7, // 7일간 유지
      //       httpOnly: true,
      //     })
      //     .status(200)
      //     .json({ loginSuccess: true, userid: user.userid });
      // });

    });
  })(req,res,next);
};



exports.handleLogout = (req,res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}