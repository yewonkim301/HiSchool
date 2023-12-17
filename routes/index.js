const express = require("express");
// const controller = require("../controller/Cindex");
// const controllerClub = require("../controller/Cclub");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  res.render("home");
});

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
