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
 * List of speakers.
 *
 * @param {Object} ctx The context object
 * @returns {Speaker[]} Return user list
 */
router.get('/', async(ctx) => ctx.body = await Speaker.find({}));

/**
 * Find an speaker by id.
 *
 * @param {Object} ctx The context object
 * @returns {Speaker} the speaker corresponding to the specified id
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Speaker.findById(ctx.params.id));

export default router;
