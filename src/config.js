/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

const config = Object.freeze({
  environment: process.env.NODE_ENV || 'development',
  server: {
    host: '0.0.0.0',
    port: process.env.NODE_PORT || process.env.PORT || 3000
  },
  db: {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    name: process.env.MONGO_DB_NAME || 'ionic-conference',
    nameTest: process.env.MONGO_DB_NAME_TEST || 'ionic-conference-test'
  }
});

export default config;
