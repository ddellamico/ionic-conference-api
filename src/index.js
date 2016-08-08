/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import pkg from '../package.json';
import config from './config';
import { connectDb, loadFixtures } from './db';
import _log from './utils/logger';

const log = _log(module);

const banner = `
*********************************************************************************************
*
* ${pkg.description}
* @version ${pkg.version}
* @author ${pkg.author.name}
*
*********************************************************************************************`;
log.debug(banner);
(async() => {
  try {
    const dbURI = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
    const info = await connectDb(dbURI);
    log.debug(`Connected to ${info.host}:${info.port}/${info.name}`);
  } catch (ex) {
    log.error('Unable to connect to database', ex);
  }

  try {
    await loadFixtures();
  } catch (ex) {
    log.error('Unable to seed database %s', ex);
  }

  const app = require('./server').app;

  app.listen(config.server.port, () => {
    log.debug(`App started on port ${config.server.port} with environment ${config.environment}`);
  });
})();
