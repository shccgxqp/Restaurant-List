const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
require('dotenv').config();

const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'email', 'password', 'favorite'],
    where: { email: username },
    raw: true
  })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'email 或密碼錯誤' })
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return done(null, false, { message: 'email 或密碼錯誤' })
        }
        return done(null, user)
      })
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })
}))

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value
  const name = profile.displayName

  return User.findOne({
    attributes: ['id', 'name', 'email', 'favorite'],
    where: { email },
    raw: true
  })
    .then((user) => {
      if (user) return done(null, user)

      const randomPwd = Math.random().toString(36).slice(-8)

      return bcrypt.hash(randomPwd, 10)
        .then((hash) => User.create({ name, email, password: hash }))
        .then((user) => done(null, { id: user.id, name: user.name, email: user.email, favorite: user.favorite }))
    })
    .catch((error) => {
      error.errorMessage = '登入失敗'
      done(error)
    })
}))


passport.serializeUser((user, done) => {
  const { id, name, email, favorite } = user
  return done(null, { id, name, email, favorite })
})

passport.deserializeUser((user, done) => {
  done(null, { id: user.id, name: user.name, favorite: user.favorite })
})


module.exports = passport