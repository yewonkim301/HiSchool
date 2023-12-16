const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
   res.render('index');
});

router.get('clubSchedule', (req, res) => {
   res.render('clubSchedule');
});
router.get('/home',(req,res)=>{
   res.render('home');
});
router.get('/club',(req,res)=>{
   res.render('club');
})

module.exports = router;
