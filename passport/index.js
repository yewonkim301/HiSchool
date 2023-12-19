// const passport = require("passport");
// const local = require("./localStrategy"); // 로컬서버로 로그인할때
// // const kakao = require("./kakaoStrategy"); // 카카오서버로 로그인할때
// const { User } = require("../models/Index");
// const jwt = require("./jwtStrategy")


// module.exports = () => {
//   console.log('passport/index.js 호출');
//   passport.serializeUser((user, done) => {
//     console.log('passport/index.js serializeUser 호출');
//     // console.log('passport/index.js userid', userid); 
//     // console.log('passport/index.js done', done); 
//     done(null, user);
//     console.log('완료');
//   });

//   passport.deserializeUser((user, done) => {
//     // console.log('passport/index.js deserializeUser 호출', user, done);
//     User.findOne({ where: { userid: user.userid } })
//       .then((user) => {
//         // console.log('deserializeUser');
//         console.log(user);
//         console.log('deserialize 성공');
//         done(null, user);
//       })
//       .catch((err) => {
//         console.log('에러에러');
//         done(err)
//       });
//   });

//   local();
//   // kakao();
//   // jwt();
// };





// config/passport.js

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require("../models/Index");
require('dotenv').config();

module.exports = () => {
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            // 이 부분에선 저장되어 있는 User를 비교하면 된다. 
            return UserModel.findOne({where: {email: email, password: password}})
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: 'Incorrect email or password.'});
                    }
                    return done(null, user, {message: 'Logged In Successfully'});
                })
                .catch(err => done(err));
        }
    ));
    
    //JWT Strategy
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : process.env.JWT_SECRET
        },
        function (jwtPayload, done) {
            return UserModel.findOneById(jwtPayload.id)
                .then(user => {
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });
        }
    ));
}