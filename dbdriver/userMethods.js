const User = require('./userSchema');
const bcrypt = require('bcryptjs');
const libs = process.cwd() + '/libs/';
const log = require(libs + 'log')(module);

module.exports = {
    createUser: (newUser, error, callback) => {
        bcrypt.genSalt(10, function(errorBcrypt, salt) {
            if (errorBcrypt) {
                return error(errorBcrypt);
            }

            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if (err) {
                    return error(err);
                }

                newUser.password = hash;
                const user = new User(newUser);

                user.save((err) => {
                    if (err) {
                        log.error.bind(console, `MongoDB error: ${err}`);
                        return error(err);
                    }
                    return callback();
                });
            });
        });
    },

    getUserById: (id, callback) => {
        User.findById(id, callback);
    },

    getUserByEmail: (email, error, callback) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                log.error.bind(console, `findAllUsers: ${err}`);
                return error(err);
            } else {
                return callback(user);
            }
        });
    },

    findAllUsers: (error, callback) => {
        User.find({}, (err, list) => {
            if (err) {
                log.error.bind(console, `findAllUsers: ${err}`);
                return error(err);
            } else {
                return callback(list);
            }
        })
    },

    clear: (err) => {
        User.deleteMany({}, (error) => {
            return err(error);
        })
    },

    comparePassword: (candidatePassword, hash, callback) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    }
};