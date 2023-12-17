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
  res.render("club");
});
router.get("/createClub", (req, res) => {
  res.render("createClub");
});

router.get("/clubDetail", (req, res) => {
  res.render("clubDetail");
});

router.get('/clubRegister', (req, res) => {
  res.render("clubRegister");
});

router.get("/clubSchedule", (req, res) => {
  res.render("clubSchedule");
});

router.get("/publicPost", (req, res) => {
  res.render("publicPost");
});

module.exports = router;
