/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';

/**
 * Speaker Schema
 */
const SpeakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    trim: true,
    required: true
  },
  twitter: {
    type: String
  },
  about: {
    type: String
  },
  location: {
    type: String,
    required: true
  }
});

/**
 * @typedef Speaker
 */
mongoose.model('Speaker', SpeakerSchema);
