/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import methodOverride from 'koa-methodoverride';
import handleError from './handle-error';

export default function () {
  return compose([
    helmet(),
    convert(cors()),
    convert(bodyParser()),
    convert(methodOverride()),
    handleError()
  ]);
}
