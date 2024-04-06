const express = require('express');
const router = express.Router();
const firebaseDb = require('../service/firebase-admin-connect');
const firebase = require('../service/firebase-connect');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const auth = getAuth(firebase);

router.get('/', (req, res) => {
  res.render('signup', { title: '註冊' });
})

router.post('/', (req, res) => {
  const { email, password, nickname } = req.body;
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const saveUser = {
        email,
        nickname,
        uid: userCredential.user.uid,
      }
      firebaseDb.ref(`/users/${userCredential.user.uid}`).set(saveUser);
      res.redirect('/signUp/success');
    })
    .catch((error) => {
      console.log('error.message:', error.message);
      res.redirect('/signUp');
    })



  // firebaseAuth.createUserWithEmailAndPassword(email, password)
  //   .then((user) => {
  //     const saveUser = {
  //       email,
  //       nickname,
  //       uid: user.uid,
  //     }
  //     console.log('1');
  //     firebaseDb.ref(`/users/${user.uid}`).set(saveUser);
  //     console.log('2');
  //     res.redirect('/signUp/success');
  //   })
  //   .catch((error) => {
  //     console.log('error.message:', error.message);
  //     res.redirect('/signUp');
  //   })
})

router.get('/success', (req, res) => {
  res.render('success', {
    title: '註冊成功'
  });
})

module.exports = router;