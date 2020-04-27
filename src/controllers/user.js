const express = require('express');
const router = express.Router();
import User from '../models/user';


router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          const err = new Error('Not authorized! Go back!');
          err.status = 400;

          return next(err);
        } else {
          const { username, email, role } = user;

          return res.send(`
                  <b>username:</b>${username}<br>
                  <b>email:</b>${email}<br> 
                  <b>role:</b>${role}<br> 
                  <a type="button" href="/logout">Logout</a>
                  `);
        }
      }
    });
});


router.get('/logout', (req,res,next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  const {username, pass} = req.body;
  User.authenticate(username, pass, function (error, user) {
    if (error || !user) {
      const err = new Error('Wrong email or password.');
      err.status = 401;

      return next(err);
    } else {
      req.session.userId = user._id;

      return res.redirect('/profile');
    }
  });
});

router.post('/signup', (req, res, next) => {
  const {username, email, pass, repass, role} = req.body;
  if (!role) {
    return res.status(400).send("role is not specified");
  }
  if (pass !== repass) {
    return res.status(400).send("passwords dont match");
  }

  if (username && email && pass && repass && role) {
    const userData = {
      email,
      username,
      role,
      password: pass,
    };

    User.create(userData, function (error, user) {
      if (error) {
        return res.status(400).send("mongoDB cannot create such user");
      } else {
        req.session.userId = user._id;

        return res.redirect('/profile'); // TODO: should be implemented
      }
    });

  }

});

export default router;
