const libs = process.cwd() + '/libs/';
const mongoose = require('mongoose');
const log = require(libs + 'log')(module);
const config = require('../libs/config');
const UserSchema = require('./userSchema');

console.log(config.get('db'), "rere");

mongoose.connect(config.get('db:mongoose:uri'), { useNewUrlParser: true }).then((data) =>
    console.info(`Connected to db. Model: ${JSON.stringify(data.models)}`)
);

const db = mongoose.connection;

db.on('error', log.error.bind(console, 'MongoDB connection error:'));

db.once('open', function callback () {
    log.info("Connected once to DB!");
});

module.exports = mongoose;