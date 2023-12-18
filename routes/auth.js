
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/User');
const router = express.Router();



router.post('/register',isNotLoggedIn, async (req,res,next)=>{
  console.log('회원가입 요청 처리 시작');
  // console.log(req);
  const { userid, name, school, grade, classid, birthday, phone, password } = req.body;
  try {
    const exUser = await User.findOne({ where : { userid: userid }});
    if(exUser) {
      return res.redirect('/join?error=exist');
    }else {
      const hash = await bcrypt.hash(password,12);
      await User.create({
        userid,
        name,
        school,
        grade,
        classid,
        birthday,
        phone,
        password : hash,
      });
      return res.redirect('/');
    }
  }catch(error){
    console.error(error);
    return next(error);
  }
});



router.post('/login',isNotLoggedIn,(req,res,next)=>{
  passport.authenticate('local',(authError,user,info)=>{
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if (!user){
      return res.redirect(`/?loginError=${info.message}`)
    }
    return req.login(user, (loginError) => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req,res,next);
});



router.get('/logout',isLoggedIn,(req,res)=>{ 
  req.logout();
  req.session.destroy();
  res.redirect('/');
});



module.exports = router;