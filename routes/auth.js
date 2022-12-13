import {Router as router} from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';
import passport from '../passport/setup.js';
import {userIsAuthorized, userIsAnon} from '../middleware/index.js';

const customRouter = router();

customRouter
    .get('/sign-up', (req, res, next) => {
      res.render('pages/signup-form', {title: 'Sign Up'});
    })
    .post('/sign-up', (req, res, next) => {
      const {password} = req.body;
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return next(err);

        const {firstName, lastName, email} = req.body;

        new User({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: hashedPassword,
        }).save((err) => {
          if (err) return next(err);

          res.redirect('/');
        });
      });
    });

customRouter
    .get('/log-in', userIsAnon, (req, res, next) => {
      res.render('pages/login-form', {title: 'Log In'});
    })
    .post('/log-in',
        userIsAnon,
        passport.authenticate(
            'local',
            {
              failureRedirect: '/auth/log-in',
              successRedirect: '/',
              failureFlash: true,
            },
        ),
    );

customRouter
    .get('/confirm', userIsAuthorized, (req, res, next) => {
      res.render(
          'pages/secret',
          {
            title: 'Enter your passcode to confirm membership',
          },
      );
    })
    .post('/confirm', userIsAuthorized, (req, res, next) => {
      User.findById(req.user.id, (err, user) => {
        if (err) return next(err);

        if (req.body.passcode === process.env.PASSCODE) {
          user.status = true;
          user.save();

          req.flash('info', 'Success!');
          return res.redirect('/');
        }

        if (req.body.passcode === process.env.PASSCODE_ADMIN) {
          user.status = true;
          user.isAdmin = true;
          user.save();

          req.flash('info', 'Success!');
          return res.redirect('/');
        }

        req.flash('error', 'Passcode is wrong');
        res.redirect('/auth/confirm');
      });
    });

customRouter.get('/log-out', userIsAuthorized, (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);

    res.redirect('/');
  });
});

export default customRouter;
