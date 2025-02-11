const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');


//signUp
router.post('/signup', auth.signUp);

//signIn
router.post('/signin', authController.signIn);

//signOut
router.post('/signout', authController.signout);


module.exports = router;