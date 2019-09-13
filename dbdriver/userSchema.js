const mongoose = require('./mongooseConnector');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({

    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique : true,
        required: true,
    },
    phone: String,
    created: {
        type: Date,
        default: Date.now
    }
});

Object.assign(UserSchema.methods, require("./userMethods.js"));
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);