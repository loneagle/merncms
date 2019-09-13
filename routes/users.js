const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Tools = require('../libs/tools');
const jwt = require("jsonwebtoken");

const User = require('../dbdriver/userMethods');

passport.use(
    new LocalStrategy((email, password, done) => {
        User.getUserByUsername(email, (err, row) => {
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/signup', (req, res) => {
    const { user } = req.body;

    if (Tools.notNullFieldsSignUp(user)) {
        User.createUser(req.body.user, (err) => {
            return res.json({ error: err && err.errors });
        }, () => {
            return res.json({ success: true });
        });
    } else {
        return res.json({ success: false });
    }
});

router.post('/login', (req, res, next) => {
    const { user } = req.body;

    if (Tools.notNullFieldsSignUp) {
        passport.authenticate("local", { session: false }, (err, user) => {
            if (err) {
                if (err.name === "IncorrectCredentialsError") {
                    return res.status(401).json({
                        success: false,
                        message: err.message
                    });
                }
                return res.status(401).json({
                    success: false,
                    message: "Could not process the form"
                });
            }
            const payload = {
                id: user.idUser
            };
            const token = jwt.sign(payload, "your_jwt_secret");
            return res.json({
                token: token,
                success: true,
                user
            });
        })(req, res, next);
    } else {
        return res.json({ success: false });
    }
});

router.get('/getAllUsers', (req, res) => {
    User.findAllUsers((err) => {
        return res.json({ error: err })
    }, (users) => {
        return res.json({ users: users });
    });
});

router.get('/clear', (req, res) => {
    User.clear((err) => {
        res.json({ error: err });
    });
});

module.exports = router;
