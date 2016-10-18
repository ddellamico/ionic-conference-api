/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import passport from 'koa-passport';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import oauth2orize from 'oauth2orize-koa';
import compose from 'koa-compose';
import uuid from 'node-uuid';
import _debug from 'debug';
import logger from '../../utils/logger';
import config from './config';

const debug = _debug('ion-conf-app:auth.oauth2');
const log = logger(module);

const User = mongoose.model('User');
const RefreshToken = mongoose.model('RefreshToken');

const server = oauth2orize.createServer();

/**
 * Creates jwt token and refresh token
 *
 * @param {Object} user - The user object
 * @param {String} user._id - The user id
 * @param {String} user.username - The username (email)
 * @param {Object} client - The client object
 * @param {String} client._id - The client id
 */
async function generateTokens(user, client) {
  const jwtToken = jwt.sign({
    user,
    iss: 'https://ion-conf-api.damiendev.com', // iss: "https://YOUR_NAMESPACE",
    aud: client._id // aud: "YOUR_CLIENT_ID"
  }, config.secret, { expiresIn: parseInt(config.tokenExpiration, 10) });

  await RefreshToken.findOneAndRemove({ user: user._id });

  const refreshTokenVal = uuid.v4();
  await RefreshToken.create({
    token: refreshTokenVal,
    user: user._id,
    client: client._id
  });

  return [jwtToken, refreshTokenVal, { expires_in: config.tokenExpiration }];
}

/**
 * Exchange username & password for access token.
 */
server.exchange(oauth2orize.exchange.password(async(client, username, password, scope) => {
  if (!client.trusted) return false;
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user || !user.active) return false;
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return false;
    debug('Valid credentials. current scope --> %s', scope);
    return await generateTokens(user, client);
  } catch (err) {
    log.error(err);
  }
  return false;
}));

/**
 * Exchange refreshToken for access token.
 */
server.exchange(oauth2orize.exchange.refreshToken(async(client, refreshToken, scope) => {
  if (!client.trusted) return false;

  const refreshTokenHash = RefreshToken.encryptToken(refreshToken);

  try {
    const refToken = await RefreshToken.findOne({ token: refreshTokenHash, client: client._id });
    if (!refToken) {
      debug('Refresh token not found');
      return false;
    }

    debug('Refresh token found. Current scope --> %s', scope);
    const user = await User.findById(refToken.user);

    if (!user || !user.active) {
      debug('User not found or not active--> %j', refToken.user);
      return false;
    }

    return await generateTokens(user, client);
  } catch (err) {
    log.error(err);
  }
  return false;
}));

/**
 *`token` middleware handles client requests to exchange authorization grants
 * for jwt tokens.  Based on the grant type being exchanged, the above
 * exchange middleware will be invoked to handle the request.  Clients must
 * authenticate when making requests to this endpoint.
 * @returns {Object} The token middleware
 */
export function token() {
  return compose([
    passport.authenticate(['basic', 'clientPassword'], { session: false }),
    server.token(),
    server.errorHandler()
  ]);
}

export function authorize() {
  return passport.authenticate('jwt', { session: false });
}
