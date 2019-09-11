const User = require('./userSchema');
const bcrypt = require('bcryptjs');

User.methods = {
    createUser: function(newUser) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    }
};

module.exports = User;