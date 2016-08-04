/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import auth from './auth';
import { token } from './auth/oauth2';
import importDir from 'import-dir';

const app = new Koa();
app.use(auth(passport));

const router = new Router({
  prefix: '/api'
});

router.post('/auth/token', token());
const routes = importDir('./routes');

Object.keys(routes).forEach(name => {
  const _route = routes[name];
  router.use(_route.routes());
});
app.use(router.routes());

export default app;
