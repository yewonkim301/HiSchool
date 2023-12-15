/* eslint-disable no-console */
const express = require('express');

const app = express();
const path = require('path');

const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'static')));

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 실행중`);
});
