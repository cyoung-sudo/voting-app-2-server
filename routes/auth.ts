import express from "express";
// Authentication
import passport from "passport";

const authRoutes = express.Router();

// Return authenticated user
authRoutes.get("/", (req, res) => {
  if(req.user) {
    res.json({
      success: true,
      user: req.user
    });
  } else {
    res.json({
      success: false,
      message: "User not authenticated"
    });
  }
});

// Login user
authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err: Error, user: any, info: {message: string}) => {
    if(err) next(err);
    // Failed login
    if(!user) {
      res.json({
        success: false,
        message: info.message
      });
    // Successful login
    } else {
      req.login(user, err => {
        if(err) next(err);
        res.json({
          success: true,
          user
        });
      })
    }
  })(req, res, next);
});

// Logout user
authRoutes.delete('/logout', (req, res, next) => {
  req.logout(err => {
    if(err) return next(err);
    res.json({ success: true });
  });
});

export default authRoutes;