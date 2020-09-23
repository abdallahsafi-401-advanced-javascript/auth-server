'use strict';

const jwt = require('jsonwebtoken');
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('Auth Router', () => {
  describe(`users signup/in`, () => {
    it('can sign up', async () => {
      const userData = {
        username: 'khaled',
        password: '1234',
        role: 'regular',
      };
      const results = await mockRequest.post('/signup').send(userData);
      let user = results.body;
      expect(userData[name]).toEqual(user[name]);
    });

    it('can signin with basic', async () => {
      const userData = { username: 'waleed', password: '1234', role: 'admin' };
      await mockRequest.post('/signup').send(userData);
      const results = await mockRequest.post('/signin').auth('waleed', '1234');
      const token = jwt.verify(results.body.token, process.env.SECRET);
      expect(token).toBeDefined();
    });
  });

  it('can get() all users with bearer token', async () => {
    const user1 = { username: 'ahmed', password: '1234', role: 'regular' };
    const user2 = { username: 'samy', password: '1234', role: 'regular' };
    const userList = [user1, user2];
    await mockRequest.post('/users').send(user1);
    await mockRequest.post('/users').send(user2);
    const results = await mockRequest.post('/signin').auth('waleed', '1234');
    const usersRet = await mockRequest
      .get('/users')
      .set('Authorization', `Bearer ${results.body.token}`);
    const userItem = usersRet.body.results;
    userItem.forEach((key) => {
      expect(userItem[key]).toEqual(userList[key]);
    });
  });

  it('should respond with 404 for not found routes', () => {
    return mockRequest
      .get('/users/notFound')
      .then((result) => {
        expect(result.status).toBe(404);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should respond with 500 for bad routes', () => {
    return mockRequest
      .get('/bad')
      .then((result) => {
        expect(result.status).toBe(500);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
