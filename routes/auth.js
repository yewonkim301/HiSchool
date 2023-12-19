const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
const controllerAuth = require("../controller/Cauth");
const controllerAccount = require("../controller/Caccount")
const passport = require('passport')


/* router.post('/register', isNotLoggedIn, controllerAuth.handleRegister)

router.post('/login', isNotLoggedIn, controllerAuth.handleLogin)

router.get('/logout', isLoggedIn, controllerAuth.handleLogout) */



router.post('/register', passport.authenticate('local'), controllerAccount.register)

router.post('/login', isNotLoggedIn, controllerAccount.login)

// router.get('/logout', isLoggedIn, controllerAccount.logout)




module.exports = router;