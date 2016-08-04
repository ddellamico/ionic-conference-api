import mongoose from 'mongoose';
import crypto from 'crypto';
import config from '../../config';
import logger from '../../utils/logger';

const log = logger(module);

const RefreshTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  salt: {
    type: String
  },
  created_at: {
    type: Date,
    expires: config.refreshTokenExpiration
  }
});

RefreshTokenSchema.pre('validate', async function preValidate(next) {
  if (this.isNew) {
    try {
      this.token = this.constructor.encryptToken(this.token);
      this.created_at = Date.now();
    } catch (error) {
      log.error(error);
      next(error);
    }
  }
  next();
});

/**
 * Static methods
 */
RefreshTokenSchema.statics = {
  encryptToken: function encryptToken(refreshToken) {
    return crypto.createHash('sha1').update(refreshToken).digest('hex');
  }
};


mongoose.model('RefreshToken', RefreshTokenSchema);
