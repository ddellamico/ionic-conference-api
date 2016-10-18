/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import Koa from 'koa';
import passport from 'koa-passport';
import Router from 'koa-router';
import importDir from 'import-dir';
import auth from './auth';
import { token } from './auth/oauth2';

const app = new Koa();
app.use(auth(passport));

const router = new Router({
  prefix: '/api'
});

/**
 * @apiDefine TokenError
 * @apiError Unauthorized Invalid JWT token
 *
 * @apiErrorExample {json} Unauthorized-Error:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": 401,
 *       "error": "Unauthorized"
 *     }
 */

/**
 * @api {post} /auth Authenticate user
 * @apiVersion 1.0.0
 * @apiName AuthUser
 * @apiGroup Auth
 *
 * @apiParam {String} username      User username.
 * @apiParam {String} password      User password.
 * @apiParam {String} grant_type    OAuth2 grant type specification.
 * @apiParam {String} client_id     client (application) identifier.
 * @apiParam {String} client_secret client (application) secret.
 *
 * @apiExample Example usage:
 * curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'username=azagthoth@gmail.com&password=secret&grant_type=password&client_id=ion-conf-app&client_secret=secret' "https://ion-conf-api.damiendev.com/api/auth/token"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "access_token":"eyJhbGciOiJIUzI1NiIsInR4cCI1IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU2OTI4MjBmNzgyMmU3OTMyMmQ2NFlMSI",
 *      "refresh_token":"436d7dfc-be49-42d5-a166-92830959af18",
 *      "expires_in":"86400",
 *      "token_type":"Bearer"
 *     }
 *
 * @apiError Unauthorized Invalid resource owner credentials
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": 401,
 *       "error": "Unauthorized"
 *     }
 */
router.post('/auth/token', token());
const routes = importDir('./routes');

Object.keys(routes).forEach(name => {
  const _route = routes[name];
  router.use(_route.routes());
});
app.use(router.routes());

export default app;
