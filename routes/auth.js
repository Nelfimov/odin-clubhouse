import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

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
        firstName,
        lastName,
        email,
        hashedPassword,
      }).save((err) => {
        if (err) return next(err);

        res.redirect('/');
      });
  })
});

export default router;
