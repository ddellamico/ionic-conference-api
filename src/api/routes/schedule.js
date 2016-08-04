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
 * List of schedules.
 *
 * @param {Object} ctx The context object
 * @returns {Schedule[]} Return user list
 */
router.get('/', async(ctx) => ctx.body = await Schedule.find({}));

/**
 * Find an schedule by id.
 *
 * @param {Object} ctx The context object
 * @returns {Schedule} the schedule corresponding to the specified id
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Schedule.findById(ctx.params.id));


export default router;
