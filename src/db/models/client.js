/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  id: {
    type: String,
    unique: true,
    required: true
  },
  secret: {
    type: String,
    required: true
  },
  trusted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

mongoose.model('Client', ClientSchema);
