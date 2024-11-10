const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const { Food } = require('../models/user');

router.get('/', (req, res) => {
  User.findById(req.session.user._id)
    .then(user => res.render('foods/index.ejs', { foods: user.pantry }))
    .catch(err => res.redirect('/'));
});

router.get('/', async (req, res) => {
    try {
      const pantry = await Food.find({ userId: req.session.user._id });
      res.render('foods/index.ejs', { pantry });
    } catch (error) {
      console.error("Error fetching pantry items:", error);
      res.status(500).send("Internal Server Error");
    }
  });

router.post('/', (req, res) => {
  User.findById(req.session.user._id)
    .then(user => {
      user.pantry.push(req.body);
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.session.user._id}/foods`))
    .catch(err => res.redirect('/'));
});

router.get('/:itemId/edit', (req, res) => {
  User.findById(req.session.user._id)
    .then(user => {
      const food = user.pantry.id(req.params.itemId);
      res.render('foods/edit.ejs', { food });
    })
    .catch(err => res.redirect('/'));
});

router.put('/:itemId', (req, res) => {
  User.findById(req.session.user._id)
    .then(user => {
      const food = user.pantry.id(req.params.itemId);
      food.set(req.body);
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.session.user._id}/foods`))
    .catch(err => res.redirect('/'));
});

router.delete('/:itemId', (req, res) => {
  User.findById(req.session.user._id)
    .then(user => {
      user.pantry.id(req.params.itemId).remove();
      return user.save();
    })
    .then(() => res.redirect(`/users/${req.session.user._id}/foods`))
    .catch(err => res.redirect('/'));
});

module.exports = router;