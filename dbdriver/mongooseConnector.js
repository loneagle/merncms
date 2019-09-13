const libs = process.cwd() + '/libs/';
const mongoose = require('mongoose');
const log = require(libs + 'log')(module);
const config = require('../libs/config');

mongoose.connect(config.get('db:mongoose:uri'), { useNewUrlParser: true, useCreateIndex: true }).then(() => log.info(`Mongo init`));

const db = mongoose.connection;

db.on('error', log.error.bind(console, 'MongoDB connection error'));

module.exports = mongoose;