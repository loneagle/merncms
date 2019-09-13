const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Tools = require('../libs/tools');

const User = require('../dbdriver/userMethods');

passport.use(
    new LocalStrategy((username, password, done) => {
        User.getUserByUsername(username, (err, row) => {
            if (err) return done(err);
            if (!row) {
                return done(Tools.getError());
            }

            User.comparePassword(password, row.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, row);
                } else {
                    return done(Tools.getError());
                }
            });
        });
    })
);

router.post('/signup', (req, res) => {
    const { user } = req.body;

    if (Tools.notNullFieldsSignUp(user)) {
        User.createUser(req.body.user, (err) => {
            res.json({ success: !err });
        });
    } else {
        res.json({ success: false });
    }
});

router.get('/getAllUsers', (req, res) => {
    User.findAllUsers((err, users) => {
        console.log(users);
    });
    res.json({ success: false });
});

module.exports = router;
