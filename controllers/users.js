
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.render('users/index.ejs', { users }))
    .catch(err => res.redirect('/'));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.render('users/show.ejs', { foods: user.pantry }))
    .catch(err => res.redirect('/'));
});

module.exports = router;