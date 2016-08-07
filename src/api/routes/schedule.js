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

const Schedule = mongoose.model('Schedule');

const router = new Router({
  prefix: '/schedules'
});

router.use(authorize());

/**
 * @api {get} /schedules Get all schedules
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetSchedules
 * @apiGroup Schedules
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/schedules"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *      {
 *        "_id": "57a4c8582901b52c0063f839",
 *        "date": "2047-05-17T00:00:00.000Z",
 *        "__v": 0,
 *        "groups": [
 *          {
 *            "time": "8:00 am",
 *            "_id": "57a4c8582901b52c0063f853",
 *            "sessions": [
 *              {
 *                "name": "Breakfast",
 *                "description": "Mobile devices and browsers are now advanced...",
 *                "timeStart": "8:00 am",
 *                "timeEnd": "9:00 am",
 *                "_id": "57a4c8582901b52c0063f854",
 *                "tracks": [
 *                  "Food"
 *                ],
 *                "speakerNames": []
 *              }
 *            ]
 *          }
 *        ]
 *      }
 *     ]
 *
 * @apiUse TokenError
 */
router.get('/', async(ctx) => ctx.body = await Schedule.find({}));


/**
 * @api {get} /schedules/:id Get schedule
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetSchedule
 * @apiGroup Schedules
 *
 * @apiExample Example usage:
 * curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer $JWT_TOKEN" "https://ion-conf-api.damiendev.com/api/schedules/57a4c8582901b52c0063f839"
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "57a4c8582901b52c0063f839",
 *        "date": "2047-05-17T00:00:00.000Z",
 *        "__v": 0,
 *        "groups": [{
 *            "time": "8:00 am",
 *            "_id": "57a4c8582901b52c0063f853",
 *            "sessions": [{
 *                "name": "Breakfast",
 *                "description": "Mobile devices and browsers are now advanced...",
 *                "timeStart": "8:00 am",
 *                "timeEnd": "9:00 am",
 *                "_id": "57a4c8582901b52c0063f854",
 *                "tracks": ["Food"]
 *                "speakerNames": []
 *            }]
 *          }]
 *     }
 *
 * @apiUse TokenError
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Schedule.findById(ctx.params.id));


export default router;
