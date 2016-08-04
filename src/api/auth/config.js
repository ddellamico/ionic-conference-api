'use strict';

export default Object.freeze({
  secret: process.env.TOKEN_SECRET || 'secret-jwt-token',
  tokenExpiration: process.env.TOKEN_EXPIRATION || 86400,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || 172800
});
