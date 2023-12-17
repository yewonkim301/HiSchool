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

module.exports = router;
