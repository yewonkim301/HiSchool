require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const bcrypt = require("bcrypt");
const { User } = require("../models/Index");


const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};




const JWTVerify = async (jwtPayload, done) => {
  try {
    // jwtPayload에 유저 정보가 담겨있다.
		// 해당 정보로 유저 식별 로직을 거친다.
    const user = await User.findOne({
      where: {
        userid: jwtPayload.userid
      }
    })

    // 유효한 유저라면
    if (user) {
      done(null, user);
      return;
    }
    // 유저가 유효하지 않다면
    done(null, false, { message: 'inaccurate token.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));



// 토큰에 담길 유저명의 key를 지정하는 옵션. 패스워드도 지정할 수 있다.
const passportConfig = { usernameField: 'userid' };

passport.use(
  'signup',
  new localStrategy(passportConfig, async (userName, password, done) => {
		// 유저 생성
    const newUser = await User.create({
      
    })
		// 성공하면
    return done(null, userName);
		
		// 실패하면
    return done(null, false, { message: 'User creation fail.' });
  });
);

passport.use(
  'signin',
  new localStrategy(passportConfig, async (userName, password, done) => {
    // 유저가 db 에 존재한다면
    return done(null, userName, { message: 'Sign in Successful' });

		// 없다면
    return done(null, false, { message: 'Wrong password' });
  })
);

module.exports = { passport };









// // passport-jwt인증에 사용할 옵션
// const jwtOptions = {
//   // header에 bearer스키마에 담겨온 토큰 해석할 것
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   // 해당 복호화 방법사용
//   secretOrKey: process.env.JWT_SECRET
// };

// // 인증 성공시 콜백함수
// const verifyUser = async (payload, done) => {
//   console.log("payload", payload);
//   try {
//     const exUser = await User.findOne({ 
//       where: { userid: payload.userid } 
//     });
//     // user가 있을 경우
//     if (exUser) {
//       console.log('일치하는 유저 정보 확인');
//       return done(null, exUser);
//     } else {
//       console.log('일치하는 유저 정보 없음');
//       return done(null, false);
//     }
//   } catch (error) {
//     console.log('jwt 인증 에러');
//     return done(error, false);
//   }
// };


// // jwtOptions를 기반으로한 jwt전략으로 인증하고 성공시  verifyUser호출
// passport.use(new JwtStrategy(jwtOptions, verifyUser));
// passport.initialize();
