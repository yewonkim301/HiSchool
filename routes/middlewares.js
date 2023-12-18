exports.isLoggedIn = (req, res, next) => {
  console.log('middleware isLoggedIn 호출');
  if (req.isAuthenticated()) {
    next(); 
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log('middleware isNotLoggedIn 호출');
  if (!req.isAuthenticated()) {
    console.log('middleware.js isNotLoggedIn true');
    next(); 
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
