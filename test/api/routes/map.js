/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

export default function (request, context) {
  describe('Maps', () => {
    it('should not fetch markers if token is invalid', async() => {
      await request.get('/api/maps')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 0'
        })
        .expect(401);
    });

    it('should fetch all markers', async() => {
      const { token } = context;
      const req = await request.get('/api/maps')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /json/);

      const maps = req.res.body;
      maps.should.to.be.instanceOf(Array);
      maps[0].should.have.property('_id');
      maps[0].should.have.property('name');
      maps[0].should.have.property('lat');
      maps[0].should.have.property('lng');
    });
  });
}
