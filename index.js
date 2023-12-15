/* eslint-disable no-console */
const express = require("express");

const app = express();
const path = require("path");

const db = require("./models/Index");
const dotenv = require("dotenv");

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "static")));
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

// db.sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 실행중`);
});
// })
