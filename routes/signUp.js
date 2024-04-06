const express = require('express');
const router = express.Router();
const firebaseDb = require('../service/firebase-admin-connect'); 
const firebase = require('../service/firebase-connect');
const firebaseAuth = firebase.firebaseAuth;
console.log('firebaseAuth:', firebaseAuth);

router.get('/', (req, res) => {
  res.render('signup', { title: '註冊' });
})

// router.post('/', (req, res) => {
//   const { email, password, nickname } = req.body;
//   firebaseAuth.createUserWithEmailAndPassword(email, password)
//     .then((user) => {
//       const saveUser = {
//         email,
//         nickname,
//         uid: user.uid,
//       }
//       firebaseDb.ref(`/users/${user.uid}`).set(saveUser);
//       res.redirect('/signUp/success');
//     })
//     .catch((error) => {
//       console.log('error.message:', error.message);
//       res.redirect('/signUp');
//     })
// })

router.get('/success', (req, res) => {
  res.render('success', {
    title: '註冊成功'
  });
})

module.exports = router;