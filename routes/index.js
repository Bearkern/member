const express = require('express');
const router = express.Router();
const firebaseDb = require('../service/firebase-admin-connect');

router.get('/', (req, res, next) => {
  firebaseDb.ref().once('value', (snapshot) => {
    console.log('snapshot.val():', snapshot.val());
  })
  res.render('index', {
    title: '六角學院留言板'
  });
});
/* GET home page. */
module.exports = router;