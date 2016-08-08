/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';
import importDir from 'import-dir';
import _log from '../utils/logger';
import _debug from 'debug';

const log = _log(module);
const debug = _debug('ion-conf-app:db');

// loud rejection
Promise.onPossiblyUnhandledRejection(log.error);

// Plugging in bluebird Promises Library
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

// load mongoose models
importDir('./models');
const fixtures = importDir('./fixtures');

// if the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/***
 * create mongoose connection
 * @param {string} dbURI
 */
export function connectDb(dbURI) {
  return new Promise((resolve, reject) => {
    // create the database connection
    mongoose.connect(dbURI, { server: { socketOptions: { keepAlive: 1 } } });

    mongoose.connection
      .on('error', (err) => {
        debug('Mongoose connection error: %s', err.message);
        reject(err);
      })
      .on('close', (err) => debug('Mongoose connection error %', err))
      .once('open', () => resolve(mongoose.connections[0]))
      .on('connected', () => {
        debug('Mongoose connected to', dbURI);
      });
  });
}

/***
 * Load fixture for a specific mongoose model
 * @param {string} modelName
 * @param {boolean} removeData
 * @returns {*}
 * @private
 */
const _loadModelFixture = async(modelName, removeData = false) => {
  const model = mongoose.model(modelName);
  const fixture = fixtures[modelName.toLocaleLowerCase()];
  if (!model || !fixture) {
    debug(`Invalid model or fixtures for ${modelName}`);
    return Promise.resolve();
  }
  return model.findOne().then(items => {
    if (!items || removeData) {
      return model.find({}).remove().then(() => model.create(fixture));
    }
    return Promise.resolve();
  });
};

/***
 * Load mongoose models and fill fixtures
 */
export function loadFixtures(removeData = false) {
  const promises = [];
  Object.keys(mongoose.models).forEach(name => {
    debug(`Loading fixtures for ${name}`);
    const promise = _loadModelFixture(name, removeData);
    promises.push(promise);
  });
  return Promise.all(promises).then(() => {
    debug('fixtures loaded');
  });
}
