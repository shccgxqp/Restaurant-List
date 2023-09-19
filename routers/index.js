const express = require('express');
const router = express.Router();

const restaurant = require('./restaurant');

router.use('/restaurant', restaurant);

router.get('/', (req, res) => {
  res.redirect('/restaurant');
});

module.exports = router;
