/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';

/**
 * Image Schema
 */
const ImageSchema = new mongoose.Schema({
  fileName: {
    type: String
  },
  url: {
    type: String,
    trim: true,
    required: true
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  description: {
    type: String
  },
  tags: {
    type: [{
      type: String
    }]
  }
});

/**
 * @typedef Image
 */
mongoose.model('Image', ImageSchema);
