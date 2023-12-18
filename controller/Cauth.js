const { User } = require("../models/Index");

const passport = require("passport");
const bcrypt = require("bcrypt");


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
  passport.authenticate('local', (authError, user, info)=>{
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
      // return res.redirect('/');
      return res.render('index')
    });
  })(req,res,next);
};



exports.handleLogout = (req,res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}