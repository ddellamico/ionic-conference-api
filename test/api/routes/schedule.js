/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

export default function (request, context) {
  describe('Schedules', () => {
    it('should not fetch schedules if token is invalid', async() => {
      await request.get('/api/schedules')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 0'
        })
        .expect(401);
    });

    it('should fetch all schedules', async() => {
      const { token } = context;
      const req = await request.get('/api/schedules')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /json/);

      const schedules = req.res.body;
      schedules.should.to.be.instanceOf(Array);
      schedules[0].should.have.property('_id');
      schedules[0].should.have.property('date');
      schedules[0].should.have.property('groups');
    });
  });
}
