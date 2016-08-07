/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

const user = {
  firstName: 'Trey',
  lastName: 'Azagthoth',
  username: 'azagthoth@morbidangel.com',
  password: 'rapture'
};

export default function (request, context) {
  describe('Users', () => {
    it('should not fetch users if token is invalid', async() => {
      await request.get('/api/users')
        .set({
          Accept: 'application/json',
          Authorization: 'Bearer 0'
        })
        .expect(401);
    });

    it('should fetch all users', async() => {
      const { token } = context;
      const req = await request.get('/api/users')
        .set({
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        })
        .expect(200)
        .expect('Content-Type', /json/);

      const users = req.res.body;
      users.should.to.be.instanceOf(Array);
      users[0].should.have.property('_id');
      users[0].should.have.property('username');
      users[0].should.have.property('updated_at');
      users[0].should.have.property('created_at');
    });

    it('should create user', async() => {
      const res = await request.post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /json/);

      const newUser = res.body;
      newUser.should.have.property('_id');
      newUser.should.have.property('username');
      newUser.should.have.property('updated_at');
      newUser.should.have.property('created_at');
      newUser.username.should.equal(user.username);
    });
  });
}
