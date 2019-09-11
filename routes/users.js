const express = require('express');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require('../dbdriver/userMethods');

const getError = () => {
    const error = new Error("Incorrect email or password");
    error.name = "IncorrectCredentialsError";
    return error;
};

passport.use(
    new LocalStrategy((username, password, done) => {
        User.getUserByUsername(username, (err, row) => {
            if (err) return done(err);
            if (!row) {
                return done(getError());
            }

            User.comparePassword(password, row.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, row);
                } else {
                    return done(getError());
                }
            });
        });
    })
);

router.post("/sign", (req,res) => {
    User.createUser(req.body.user, err => {
        if (err) throw err;
        res.json({success: true});
    });
});

module.exports = router;
