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

const Speaker = mongoose.model('Speaker');

const router = new Router({
  prefix: '/speakers'
});

router.use(authorize());

/**
 * @api {get} /speakers Get all speakers
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetSpeakers
 * @apiGroup Speakers
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/speakers"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id":"57a4c8582901b52c0063f855",
 *        "name":"Eric Bobbitt",
 *        "profilePic":"https://avatars3.githubusercontent.com/u/19638?v=3",
 *        "twitter":"ericbobbitt",
 *        "about":"When he's not arguing semantics, dancing at all the wrong times...",
 *        "location":"Madison, WI",
 *      }
 *     ]
 *
 * @apiUse TokenError
 */
router.get('/', async(ctx) => ctx.body = await Speaker.find({}));

/**
 * @api {get} /speakers/:id Get speaker
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetSpeaker
 * @apiGroup Speakers
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/speakers/57a4c8582901b52c0063f855"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id":"57a4c8582901b52c0063f855",
 *        "name":"Eric Bobbitt",
 *        "profilePic":"https://avatars3.githubusercontent.com/u/19638?v=3",
 *        "twitter":"ericbobbitt",
 *        "about":"When he's not arguing semantics, dancing at all the wrong times...",
 *        "location":"Madison, WI",
 *     }
 *
 * @apiUse TokenError
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Speaker.findById(ctx.params.id));

export default router;
