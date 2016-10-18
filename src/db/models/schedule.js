/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';

const SessionItemSchema = new mongoose.Schema({
  name: {
    type: String
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  speakerNames: {
    type: [{
      type: String
    }]
  },
  timeStart: {
    type: String
  },
  timeEnd: {
    type: String
  },
  tracks: {
    type: [{
      type: String
    }]
  }
});

const ScheduleItemSchema = new mongoose.Schema({
  time: {
    type: String
  },
  sessions: [SessionItemSchema]
});

/**
 * Schedule Schema
 */
const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  groups: [ScheduleItemSchema]
});

/**
 * @typedef Schedule
 */
mongoose.model('Schedule', ScheduleSchema);
