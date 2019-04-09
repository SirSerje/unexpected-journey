const express = require('express')
const auth = express.Router()
const User = require('../models/user')

//POST route for updating data
auth.post('/auth', function (req, res, next) {
  // confirm that user typed same password twice

  if (req.body.password !== req.body.passwordConf) {
    const err = new Error('Passwords do not match.')
    err.status = 400
    res.send('passwords do not match')
    return next(err)
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error)
      } else {
        req.session.userId = user._id
        return res.send({success: 'registered', session: req.session.userId})
        // return res.redirect('/profile');
      }
    })

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        const err = new Error('Wrong email or password.')
        err.status = 401
        return next(err)
      } else {
        req.session.userId = user._id
        return res.send({auth: 'login', session: req.session.userId})
        // return res.redirect('/profile');
      }
    })
  } else {
    const err = new Error('All fields required.')
    err.status = 400
    return next(err)
  }
})

auth.get('/auth/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if(err) {
        return next(err)
      } else {
        return res.send({auth:'logout'})
        // return res.redirect('/');
      }
    })
  }
})

module.exports = auth