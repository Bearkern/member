const express = require('express');
const router = express.Router();
const firebaseDb = require('../service/firebase-admin-connect');
const firebase = require('../service/firebase-connect');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const auth = getAuth(firebase);

router.get('/', (req, res) => {
  res.render('signup', { title: '註冊', error: req.flash('error') });
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
      const errorMessage = error.message;
      req.flash('error', errorMessage)
      res.redirect('/signUp');
    })
})

router.get('/success', (req, res) => {
  res.render('success', {
    title: '註冊成功'
  });
})

module.exports = router;