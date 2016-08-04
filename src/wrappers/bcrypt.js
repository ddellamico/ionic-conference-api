/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import bcrypt from 'bcrypt';
import Promise from 'bluebird';

/**
 * Promisify `bcrypt`
 * Expose as `default`
 */
export default Promise.promisifyAll(bcrypt);
