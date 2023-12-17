const express = require("express");
// const controller = require("../controller/Cindex");
// const controllerClub = require("../controller/Cclub");
const router = express.Router();


// const userRouter = require("./userRouter")
// router.use("/auth", userRouter)


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("home");
});





router.get("/login", (req, res) => {
  res.render('login')
})

router.get("/register", (req, res) => {
  res.render('register')
})

router.get("/register/findSchool", (req, res) => {
  res.render('findSchool')
})


router.get("/club", (req, res) => {
  res.render("club/clubMain");
});
router.get("/createClub", (req, res) => {
  res.render("club/createClub");
});

router.get("/clubDetail", (req, res) => {
  res.render("club/clubDetail");
});

router.get("/clubApply", (req, res) => {
  res.render("club/clubApply");
});

router.get("/clubSchedule", (req, res) => {
  res.render("club/clubSchedule");
});






// myclub
// 2023.12.17 동아리 게시판 추가
router.get("/myClubPostMain", (req, res) => {
  res.render("myclub/myClubPostMain");
});


module.exports = router;
