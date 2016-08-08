/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

require('babel-register');
require('babel-polyfill');
require('source-map-support').install();
require('dotenv').config({ silent: true });
require('./api');
