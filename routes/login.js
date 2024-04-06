const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', { title: '登入' });
})

router.post('/', (req, res) => {

})

module.exports = router;