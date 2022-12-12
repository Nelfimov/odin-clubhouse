import {Router} from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';
import passport from '../passport/setup.js';

const router = Router();

router
  .get('/sign-up', (req, res, next) => {
    res.render('pages/signup-form', {title: 'Sign Up'});
})
  .post('/sign-up', (req, res, next) => {
    const {password} = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return next(err);

      const {firstName, lastName, email} = req.body;

      const newUser = new User({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
      }).save((err) => {
        if (err) return next(err);

        res.redirect('/');
      });
  })
});

router
  .get('/log-in', (req, res, next) => {
    res.render('pages/login-form', {title: 'Log In'});
  })
  .post('/log-in',
      passport.authenticate('local', {failureRedirect: '/auth/log-in', successRedirect: '/', failureFlash: true})
  );

export default router;
