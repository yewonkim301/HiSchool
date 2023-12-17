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
  res.render("club");
});
router.get("/createClub", (req, res) => {
  res.render("createClub");
});

router.get("/clubDetail", (req, res) => {
  res.render("clubDetail");
});

router.get("/clubRegister", (req, res) => {
  res.render("clubRegister");
});

// router.get("/clubSchedule", (req, res) => {
//   res.render("clubSchedule");
// });

router.get("/clubSchedule", (req, res) => {
  res.render("./myclub/myclubSchedule");
});

// clubAdmin
router.get("/clubAdminMain", (req, res) => {
  res.render("clubAdmin/clubAdminMain");
});
router.get("/clubAdminApplyList", (req, res) => {
  res.render("clubAdmin/clubAdminApplyList");
});
router.get("/clubAdminEdit", (req, res) => {
  res.render("clubAdmin/clubAdminEdit");
});
router.get("/clubAdminMemberList", (req, res) => {
  res.render("clubAdmin/clubAdminMemberList");
});
router.get("/clubAdminApplyDetail", (req, res) => {
  res.render("clubAdmin/clubAdminApplyDetail");
});
router.get("/clubAdminMemberDetail", (req, res) => {
  res.render("clubAdmin/clubAdminMemberDetail");
});
router.get("/clubAdminTransfer", (req, res) => {
  res.render("clubAdmin/clubAdminTransfer");
});

module.exports = router;
