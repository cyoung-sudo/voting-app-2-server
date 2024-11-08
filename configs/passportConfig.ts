// Auth
import passport from "passport";
import LocalStrategy from "passport-local";
// Encryption
import bcrypt from "bcrypt";
// Models
import User from "../models/userModel.js";

declare global {
  namespace Express {
    interface User {
      id?: string
    }
  }
}

passport.use(new LocalStrategy.Strategy((username, password, done) => {
  User.findOne({ username: username })
    .then(doc => {
      // User not found
      if(!doc) return done(null, false, {message: "User not found"});
      bcrypt.compare(password, doc.password)
        .then(res => {
          // Correct password
          if(res) {
            return done(null, doc);
          // Incorrect password
          } else {
            return done(null, false, {message: "Incorrect password"});
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => done(err));
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(doc => {
      done(null, doc);
    })
    .catch(err => done(err));
});