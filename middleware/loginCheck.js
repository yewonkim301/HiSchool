exports.isLoggedIn =(req,res,next)=>{
  if(req.isAuthenticated()){
      res.locals.isLoggedIn = req.isAuthenticated();
      const { name, profile_img } = req.user
      res.locals.foundUser = { name, profile_img }
      next()
  }else{
      res.redirect('/login')
  }
};

exports.isNotLoggedIn = (req,res,next)=>{
  if(!req.isAuthenticated()){
      next();
  }else{
      res.redirect('/')
  }
}

exports.preventIndex = (req, res, next) => {
  if(!req.isAuthenticated()){
      next();
  } else {
    res.redirect('Home')
  }
}