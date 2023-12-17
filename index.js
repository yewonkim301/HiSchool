/* eslint-disable no-console */
const express = require("express");

const app = express();
const path = require("path");

const db = require("./models/Index");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require("./routes");
app.use("/", indexRouter);

app.get("*", (req, res) => {
  console.log("error");
}); // error 페이지 ?

// db.sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 실행중`);
});
// })
