import bcrypt from 'bcryptjs';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import User from '../models/user.js';

const customPassport = passport;

customPassport.serializeUser((user, done) => {
  return done(null, user.id);
});

customPassport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

customPassport.use(
    new LocalStrategy(
        {usernameField: 'email', session: false},
        (email, password, done) => {
          User.findOne({email: email},
              (err, user) => {
                if (err) return done(err);

                if (!user) {
                  return done(null, false, {message: 'Incorrect email'});
                };

                bcrypt.compare(password, user.password, (err, res) => {
                  if (err) throw err;

                  if (res) {
                    return done(null, user);
                  } else {
                    return done(null, false, {message: 'Incorrect password'});
                  };
                });
              });
        }),
);

export default customPassport;
