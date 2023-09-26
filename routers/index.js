const express = require('express');
const router = express.Router();

const root = require('./root')
const restaurant = require('./restaurant');
const oauth = require('./oauth')
const users = require('./users')
const authHandler = require('../middlewares/auth-handler')

router.use('/', root)
router.use('/oauth', oauth)
router.use('/restaurant', authHandler, restaurant);
router.use('/users', users)

module.exports = router;
