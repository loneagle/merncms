const User = require('./userSchema');
const bcrypt = require('bcryptjs');
const libs = process.cwd() + '/libs/';
const log = require(libs + 'log')(module);

module.exports = {
    createUser: (newUser, callback) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                log.error.bind(console, `BCrypt: ${err}`);
                callback(err);
                newUser.password = hash;
                const user = new User(newUser);

                user.save((err) => {
                    if (err) {
                        log.error.bind(console, `MongoDB error: ${err}`);
                        callback(err);
                    }
                    callback();
                });
            });
        });
    },

    getUserById: (id, callback) => {
        User.findById(id, callback);
    },

    findAllUsers: (err, users) => {
        User.find({}, (error, list) => {
            err(error);
            users(list);
        })
    },

    comparePassword: (candidatePassword, hash, callback) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    }
};