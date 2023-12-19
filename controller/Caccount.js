const { User } = require("./../models/Index.js");
const config = require(".././middleware/config.js");
const jwt = require("jwt-simple");

exports.login = async function (req, res) {
  try {
    const exUser = await User.findOne({
      where: {
        userid: req.body.userid,
      },
    }).then((result) => {

      const payload = {
        userid: result.userid,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 일주일
      };
    
      console.log(payload);
    
      const token = jwt.encode(payload, config.jwtSecret);
    
      res.json({ isLogin: true, token: token });
    });
  } catch (err) {
    console.log(err);
  }
};




exports.register = async function (req, res) {
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
        profile_img: "temp",
        nickname: "temp",
      });
      return res.send({ message: "회원가입 성공" });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }

  User.create(
    new User({
      userid: req.body.userid,
      username: req.body.username,
    }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

exports.profile = function (req, res) {
  res.json({
    message: "You made it to the secured profile",
    user: req.user,
    token: req.query.secret_token,
  });
};
