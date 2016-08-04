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
 * List of markers.
 *
 * @param {Object} ctx The context object
 * @returns {Speaker[]} Return user list
 */
router.get('/', async(ctx) => ctx.body = await Map.find({}));

/**
 * Find a marker by id.
 *
 * @param {Object} ctx The context object
 * @returns {Speaker} the map corresponding to the specified id
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Map.findById(ctx.params.id));

export default router;
