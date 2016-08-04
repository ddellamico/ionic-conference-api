/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

'use strict';

import 'dotenv/config';
import supertest from 'supertest-as-promised';
import chai from 'chai';
import importDir from 'import-dir';
import config from '../../src/config';
import { connectDb, loadFixtures } from '../../src/db';
import _debug from 'debug';
const debug = _debug('ion-conf-app:db');

chai.should();
const context = {};
let request = {};

const authClient = {
  client_id: 'ion-conf-app',
  client_secret: 'secret'
};

const authUser = {
  username: 'damien.dellamico@gmail.com',
  password: 'test'
};

describe('Auth', () => {
  before(async() => {
    const dbURI = `mongodb://${config.db.host}:${config.db.port}/${config.db.nameTest}`;
    try {
      await connectDb(dbURI);
    } catch (ex) {
      debug('Unable to connect to database', ex);
    }
    const app = require('../../src/server').app;
    request = supertest.agent(app.listen());
  });

  beforeEach(async() => {
    await loadFixtures(true);
  });

  it('should throw 403 if credentials are incorrect', async() => {
    await request.post('/api/auth/token')
      .set('Accept', 'application/json')
      .send({
        username: authUser.username,
        password: 'fake',
        grant_type: 'password',
        client_id: authClient.client_id,
        client_secret: authClient.client_secret
      })
      .expect(403);
  });

  it('should auth user', async() => {
    const req = await request.post('/api/auth/token')
      .send({
        username: authUser.username,
        password: authUser.password,
        grant_type: 'password',
        client_id: authClient.client_id,
        client_secret: authClient.client_secret
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const body = req.res.body;
    body.should.have.property('access_token');
    body.should.have.property('refresh_token');

    context.token = body.access_token;
  });

  it('should exchange refreshToken for access token.', async() => {
    const reqToken = await request.post('/api/auth/token')
      .send({
        username: authUser.username,
        password: authUser.password,
        grant_type: 'password',
        client_id: authClient.client_id,
        client_secret: authClient.client_secret
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const { refresh_token } = reqToken.res.body;

    const reqRefresh = await request.post('/api/auth/token')
      .send({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: 'ion-conf-app',
        client_secret: 'secret'
      })
      .expect(200)
      .expect('Content-Type', /json/);

    const body = reqRefresh.res.body;
    body.should.have.property('access_token');
    body.should.have.property('refresh_token');
  });

  after(async() => {
    const routes = importDir('./routes');
    Object.keys(routes).forEach(name => routes[name](request, context));
  });
});
