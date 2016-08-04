/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

require('babel-register');
require('babel-polyfill');

// Source Map Support https://github.com/evanw/node-source-map-support
require('source-map-support').install();

// loads environment variables from a .env file into process.env.
require('dotenv/config');
require('./src');
