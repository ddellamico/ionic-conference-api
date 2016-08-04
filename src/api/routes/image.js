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
 * List of images.
 *
 * @param {Object} ctx The context object
 * @returns {Image[]} Return user list
 */
router.get('/', async(ctx) => ctx.body = await Image.find({}));

/**
 * Find an image by id.
 *
 * @param {Object} ctx The context object
 * @returns {Image} the image corresponding to the specified id
 */
router.get('/:id', objectIdConstraint(),
  async(ctx) => ctx.body = await Image.findById(ctx.params.id));

export default router;
