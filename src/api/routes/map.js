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

const Map = mongoose.model('Map');

const router = new Router({
  prefix: '/maps'
});

router.use(authorize());

/**
 * @api {get} /maps Get all markers
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetMarkers
 * @apiGroup Map
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/maps"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id":"57a4c8582901b52c0063f835",
 *        "name":"Monona Terrace Convention Center",
 *        "lat":43.071584,
 *        "lng":-89.38012,
 *        "center":true
 *      }
 *     ],
 *
 * @apiUse TokenError
 */
router.get('/', async(ctx) => ctx.body = await Map.find({}));

/**
 * @api {get} /maps/:id Get marker
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetMarker
 * @apiGroup Map
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/maps/57a4c8582901b52c0063f835"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id":"57a4c8582901b52c0063f835",
 *        "name":"Monona Terrace Convention Center",
 *        "lat":43.071584,
 *        "lng":-89.38012,
 *        "center":false
 *     },
 *
 * @apiUse TokenError
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Map.findById(ctx.params.id));

export default router;
