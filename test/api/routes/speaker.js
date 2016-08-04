/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

export default function (request, context) {
  describe('Speakers', () => {
    it('should not fetch speakers if token is invalid', async() => {
      await request.get('/api/speakers')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 0'
        })
        .expect(401);
    });

    it('should fetch all speakers', async() => {
      const { token } = context;
      const req = await request.get('/api/speakers')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /json/);

      const speakers = req.res.body;
      speakers.should.to.be.instanceOf(Array);
      speakers[0].should.have.property('_id');
      speakers[0].should.have.property('name');
      speakers[0].should.have.property('profilePic');
      speakers[0].should.have.property('location');
    });
  });
}
