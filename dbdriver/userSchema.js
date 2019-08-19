const mongoose = require('./mongooseConnector');

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
        required: true,
    },
    phone: String,
    created: {
        type: Date,
        default: Date.now
    }
});

Object.assign(UserSchema.methods, require("./userMethods.js"));

module.exports = mongoose.model('User', UserSchema);