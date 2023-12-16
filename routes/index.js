const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
   res.render('index');
});

router.get('clubSchedule', (req, res) => {
   res.render('clubSchedule');
});

module.exports = router;
