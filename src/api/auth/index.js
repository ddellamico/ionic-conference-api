'use strict';

import compose from 'koa-compose';
import mongoose from 'mongoose';
import * as strategies from './strategies';

const User = mongoose.model('User');

export default (passport) => {
  Object.keys(strategies).forEach(name => {
    passport.use(name, strategies[name]);
  });
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async(id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  return compose([
    passport.initialize()
  ]);
};
