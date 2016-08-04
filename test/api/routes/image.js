/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

export default function (request, context) {
  describe('Images', () => {
    it('should not fetch images if token is invalid', async() => {
      await request.get('/api/images')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 0'
        })
        .expect(401);
    });

    it('should fetch all images', async() => {
      const { token } = context;
      const req = await request.get('/api/images')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /json/);

      const images = req.res.body;
      images.should.to.be.instanceOf(Array);
      images[0].should.have.property('_id');
      images[0].should.have.property('user');
      images[0].should.have.property('url');
    });
  });
}
