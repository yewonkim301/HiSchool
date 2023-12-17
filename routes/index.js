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
  res.render("club/club");
});
router.get("/createClub", (req, res) => {
  res.render("club/createClub");
});

router.get("/clubDetail", (req, res) => {
  res.render("club/clubDetail");
});

router.get("/clubRegister", (req, res) => {
  res.render("club/clubRegister");
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
