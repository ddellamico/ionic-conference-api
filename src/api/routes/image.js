'use strict';

import mongoose from 'mongoose';
import Router from 'koa-router';
import { authorize } from '../auth/oauth2';
import { objectIdConstraint } from '../../middleware/route-constraints';

const Image = mongoose.model('Image');

const router = new Router({
  prefix: '/images'
});

router.use(authorize());

/**
 * @api {get} /images Get all images
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetImages
 * @apiGroup Images
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/images"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id":"56d5748b094d7cfd49b36533",
 *        "user":"5692820f7822e79322d671e1",
 *        "url":"http://lorempixel.com/400/200/animals/",
 *        "description":"Duis tempor non elit id.",
 *        "__v":0,
 *        "tags":["enim","velit","pariatur","ex","velit","id","aute"]
 *       }
 *     ]
 *
 * @apiUse TokenError
 */
router.get('/', async(ctx) => ctx.body = await Image.find({}));

/**
 * @api {get} /images/:id Get image
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetImage
 * @apiGroup Images
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/images/56d5748b094d7cfd49b36533"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id":"56d5748b094d7cfd49b36533",
 *        "user":"5692820f7822e79322d671e1",
 *        "url":"http://lorempixel.com/400/200/animals/",
 *        "description":"Duis tempor non elit id.",
 *        "__v":0,
 *        "tags":["enim","velit","pariatur","ex","velit","id","aute"]
 *     }
 *
 * @apiUse TokenError
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Image.findById(ctx.params.id));

export default router;
