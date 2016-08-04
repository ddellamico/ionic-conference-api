/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import mongoose from 'mongoose';
import _debug from 'debug';

const debug = _debug('ion-conf-app:route-constraints:objectId');

/**
 * A check to see if id is a valid ObjectId or not
 * @returns {Function}
 */
export function objectIdConstraint() {
  return async(ctx, next) => {
    if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
      debug('Invalid ObjectId ==> %s', ctx.params.id);
      ctx.throw('Endpoint not found.', 404);
    }
    await next();
  };
}
