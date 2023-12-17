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

router.get("/clubSchedule", (req, res) => {
  res.render("clubSchedule");
});

module.exports = router;
