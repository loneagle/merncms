const nconf = require('nconf');

nconf.argv().env().file({ file: './config.json' });

const fs = require('fs');

module.exports = nconf;