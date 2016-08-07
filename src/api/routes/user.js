/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';
import Router from 'koa-router';
import { authorize } from '../auth/oauth2';
import { objectIdConstraint } from '../../middleware/route-constraints';

const User = mongoose.model('User');
const Image = mongoose.model('Image');

const router = new Router({
  prefix: '/users'
});

/**
 * @api {get} /users Get all users
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -H "Content-Type: application/json" -X GET -H "Authorization: Bearer $JWT_TOKEN" https://ion-conf-api.damiendev.com/api/users
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id":"56d576d19f73e3c32339635c",
 *        "updated_at":"2016-08-05T17:09:44.419Z",
 *        "created_at":"2016-08-05T17:09:44.419Z",
 *        "firstName":"Ervin",
 *        "lastName":"Howell",
 *        "username":"shanna@melissa.tv",
 *        "roles":["user"]
 *       }
 *     ]
 *
 * @apiUse TokenError
 */
router.get('/', authorize(), async(ctx) => ctx.body = await User.find({}));

/**
 * @api {post} /users Create a new user
 * @apiVersion 1.0.0
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {String} firstName  User first name
 * @apiParam {String} lastName   User last name
 * @apiParam {String} username   User name (email format)
 * @apiParam {String} password   User password
 *
 * @apiExample Example usage:
 * curl -X POST -d '{
 *   "firstName": "Trey",
 *   "lastName": "Azagthoth",
 *   "username": "azagthoth@gmail.com",
 *   "password": "rapture"
 * }' "https://ion-conf-api.damiendev.com/api/users"
 *
 */
router.post('/', async(ctx) => {
  const { firstName, lastName, username, password } = ctx.request.body;

  ctx.body = await User.create({
    firstName,
    lastName,
    username,
    password
  });

  ctx.status = 201;
});

/**
 * @api {get} /users/:id Get user by id
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -X GET -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/users/5692820f7822e79322d671e1"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "_id":"56d576d19f73e3c32339635c",
 *        "updated_at":"2016-08-05T17:09:44.419Z",
 *        "created_at":"2016-08-05T17:09:44.419Z",
 *        "firstName":"Ervin",
 *        "lastName":"Howell",
 *        "username":"shanna@melissa.tv",
 *        "roles":["user"]
 *       }
 *
 * @apiUse TokenError
 */
router.get('/:id', authorize(), objectIdConstraint(),
  async(ctx) => ctx.body = await User.findById(ctx.params.id));

/**
 * @api {put} /users/:id Update existing user by id
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 *  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" -d '{
 *    "firstName": "Trey",
 *    "lastName": "Azagthoth",
 *    "username": "azagthoth@morbidangel.com"
 *  }' "https://ion-conf-api.damiendev.com/api/users/56d576d19f73e3c32309636c"
 *
 * @apiParam {String} firstName  User first name
 * @apiParam {String} lastName   User last name
 * @apiParam {String} username   User name (email format)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "_id":"56d576d19f73e3c32309636c",
 *      "updated_at":"2016-08-07T09:38:56.946Z",
 *      "created_at":"2016-08-05T17:09:44.419Z",
 *      "firstName":"Trey",
 *      "lastName":"Azagthoth",
 *      "username":"azagthoth@gmail.com",
 *      "roles":["user"]
 *     }
 *
 * @apiUse TokenError
 */
router.put('/:id', authorize(), objectIdConstraint(), async(ctx) => {
  const { firstName, lastName, username } = ctx.request.body;

  const user = await User.findByIdAndUpdate(ctx.params.id, {
    firstName,
    lastName,
    username
  }, {
    new: true,
    runValidators: true
  });
  if (user) ctx.body = user;
});

/**
 * @api {delete} /users/:id Delete a user
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/users/56d576d19f73e3c32309636c"
 *
 * @apiSuccess {StatusCode} 204
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 204 No Content
 *
 * @apiUse TokenError
 */
router.delete('/:id', authorize(), objectIdConstraint(), async(ctx) => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  if (user) ctx.status = 204;
});

/**
 * @api {get} /users/:id/images Get user images
 * @apiPermission user
 * @apiVersion 1.0.0
 * @apiName GetUserImages
 * @apiGroup Users
 *
 * @apiExample Example usage:
 * curl -X GET -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/users/5692820f7822e79322d671e1/images"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id":"56d5748b094d7cfd49b36533",
 *        "user":"5692820f7822e79322d671e1",
 *        "url":"http://lorempixel.com/400/200/animals/",
 *        "description":"Duis tempor non elit id. ",
 *        "__v":0,
 *        "tags":["enim","velit","pariatur","ex","velit","id","aute"]
 *       }
 *     ]
 *
 * @apiUse TokenError
 */
router.get('/:id/images', authorize(), objectIdConstraint(),
  async(ctx) => ctx.body = await Image.find({ user: ctx.params.id }));

export default router;
