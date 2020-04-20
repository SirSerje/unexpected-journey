const express = require('express');
const router = express.Router();
import User from '../../models/user';


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

export { router as ProfileController };
