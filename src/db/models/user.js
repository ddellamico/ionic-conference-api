/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import bcrypt from '../../wrappers/bcrypt';
import logger from '../../utils/logger';

const log = logger(module);
const SALT_WORK_FACTOR = 10;

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 3
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
    validate: validate({
      validator: 'isEmail',
      message: 'Please fill in your username'
    })
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: true,
    default: 'local'
  },
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.salt;
      delete ret.active;
      delete ret.provider;
    }
  }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', async function preSave(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    next();
  }

  try {
    user.salt = await bcrypt.genSaltAsync(SALT_WORK_FACTOR);
    user.password = await bcrypt.hashAsync(user.password, user.salt);
    next();
  } catch (error) {
    log.error(error);
    next(error);
  }
});

/**
 * Methods
 */
UserSchema.methods = {
  comparePassword: async function comparePassword(candidatePassword) {
    return await bcrypt.compareAsync(candidatePassword, this.password);
  }
};

/**
 * @typedef User
 */
mongoose.model('User', UserSchema);
