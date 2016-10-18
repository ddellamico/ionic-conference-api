/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import winston from 'winston';
import path from 'path';
import fs from 'fs';

winston.emitErrs = true;

const getFilePath = m => m.filename.split(path.sep).slice(-2).join(path.sep);

const dirLog = path.join(process.cwd(), 'logs');

if (!fs.existsSync(dirLog)) {
  fs.mkdirSync(dirLog);
}

const exFilePath = path.join(dirLog, 'exception.log');
const appFilePath = path.join(dirLog, 'application.log');
const logMaxSize = 5242880; // 5mb

// Logging Levels
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

export default function logger(module) {
  return new (winston.Logger)({
    transports: [
      new winston.transports.File({
        name: 'file.error',
        level: 'error',
        label: getFilePath(module),
        filename: exFilePath,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        maxSize: logMaxSize,
        colorize: false
      }),
      new winston.transports.File({
        name: 'file.info',
        level: 'info',
        label: getFilePath(module),
        filename: appFilePath,
        handleExceptions: false,
        json: false,
        maxSize: logMaxSize,
        colorize: false
      }),
      new winston.transports.Console({
        level: 'debug',
        label: getFilePath(module),
        handleExceptions: true,
        humanReadableUnhandledException: true,
        json: false,
        colorize: true,
        timestamp: true
      })
    ],
    exitOnError: false
  });
}
