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
 * List of users.
 *
 * @param {Object} ctx The context object
 * @returns {User[]} Return user list
 */
router.get('/', authorize(), async(ctx) => ctx.body = await User.find({}));

/**
 * Create new user
 * @param {Object} ctx The context object
 * @returns {User}
 */
router.post('/', async(ctx) => {
  const { firstName, lastName, username, password, website } = ctx.request.body;

  ctx.body = await User.create({
    firstName,
    lastName,
    username,
    password,
    website
  });

  ctx.status = 201;
});

/**
 * Find an user by id.
 *
 * @param {Object} ctx The context object
 * @returns {User} the user corresponding to the specified id
 */
router.get('/:id', authorize(), objectIdConstraint(),
  async(ctx) => ctx.body = await User.findById(ctx.params.id));

/**
 * Update existing user by id
 * @param {Object} ctx The context object
 */
router.put('/:id', authorize(), objectIdConstraint(), async(ctx) => {
  const { firstName, lastName, username, website } = ctx.request.body;

  const user = await User.findByIdAndUpdate(ctx.params.id, {
    firstName,
    lastName,
    username,
    website
  }, {
    new: true,
    runValidators: true
  });
  if (user) ctx.body = user;
});

/**
 * Delete user by id
 * @param {Object} ctx The context object
 */
router.delete('/:id', authorize(), objectIdConstraint(), async(ctx) => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  if (user) ctx.status = 204;
});

/**
 * Find images for a specific user id.
 *
 * @param {Object} ctx The context object
 * @returns {Image} the image corresponding to the specified id
 */
router.get('/:id/images', authorize(), objectIdConstraint(),
  async(ctx) => ctx.body = await Image.find({ user: ctx.params.id }));

export default router;
