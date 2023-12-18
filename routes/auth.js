const express = require('express');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');
const router = express.Router();
const controllerAuth = require("../controller/Cauth");



router.post('/register', isNotLoggedIn, controllerAuth.handleRegister)

router.post('/login', isNotLoggedIn, controllerAuth.handleLogin)

router.get('/logout', isLoggedIn, controllerAuth.handleLogout)



module.exports = router;