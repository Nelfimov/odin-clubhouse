import bcrypt from 'bcryptjs';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../models/user.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

passport.use(
  new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    User.findOne({email: email},
      (err, user) => {
        if (err) return done(err);
        
        if (!user) {
          return done(null, false, { message: 'Incorrect email' })
        };
        
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) throw err;

          if (res) {
            return done(null, user)
          } else {
            console.log('Incorrect password');
            return done(null, false, { message: "Incorrect password" })
          };
        });
      })
  })
);

export default passport;
