const request = require('supertest');
require('dotenv').config();

const BASE_URL = `http://localhost:5000`;

describe('register test', () => {
  it('should create a new user', async () => {
    const uniqueUsername = `testuser${Date.now()}`;
    const uniqueEmail = `unique${Date.now()}@gmail.com`;

    const res = await request(BASE_URL)
      .post('/api/user/register')
      .send({
        username: uniqueUsername,
        email: uniqueEmail,
        password: 'securepassword123'
      });

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('User added successfully');
    expect(res.body.user.email).toBe(uniqueEmail);
  });

  it('should return success false for missing fields', async () => {
    const res = await request(BASE_URL)
      .post('/api/user/register')
      .send({
        email: 'unique@gmail.com'
      });

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('All fields are required');
  });

  it('should return error if username already exists', async () => {
    const username = `existing_${Date.now()}`;

    await request(BASE_URL)
      .post('/api/user/register')
      .send({
        username,
        email: `${Date.now()}@example.com`,
        password: 'password123'
      });

    const res = await request(BASE_URL)
      .post('/api/user/register')
      .send({
        username,
        email: `${Date.now()}new@example.com`,
        password: 'password123'
      });

    expect(res.body.success).toBe(false);
  });

});

describe('login user', () => {
  it('should login a user', async () => {
    const email = `login_${Date.now()}@example.com`;
    const password = 'securepassword123';

    await request(BASE_URL)
      .post('/api/user/register')
      .send({
        username: `loginuser_${Date.now()}`,
        email,
        password
      });

    const res = await request(BASE_URL)
      .post('/api/user/login')
      .send({ email, password });

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("user logged in successfully!!");
  });

})


describe('test apis which need authorization', () => {
  let authToken = '';
  const userCredentials = {
    email: "noimage_1753157344088@example.com",
    password: "securepassword123"
  };

  beforeAll(async () => {
    const loginRes = await request(BASE_URL)
      .post('/api/user/login')
      .send({
        email: userCredentials.email,
        password: userCredentials.password
      });

    authToken = loginRes.body.token;
  });

  it('should get a list of all users when authenticated', async () => {
    const res = await request(BASE_URL)
      .get('/api/user/getallusers')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.body.success).toBe(false);
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeGreaterThan(0);
    expect(res.body.users[0]).toHaveProperty('id');
    expect(res.body.users[0]).toHaveProperty('username');
    expect(res.body.users[0]).toHaveProperty('email');
    expect(res.body.users[0]).not.toHaveProperty('password');
  });


  it('should return 401 Unauthorized if no token is provided', async () => {
    const res = await request(BASE_URL)
      .get('/api/user/getallusers');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toEqual('Authorization token missing');
  });

  it('should return 401 Unauthorized if the token is invalid', async () => {
    const res = await request(BASE_URL)
      .get('/api/user/getallusers')
      .set('Authorization', 'Bearer an-invalid-token-string');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });


  // get user by id
  it('should return the user by id', async () => {
    const res = await request(BASE_URL)
      .get('/api/user/getusersbyid/1')
      .set('Authorization', `Bearer ${authToken}`);
      console.log(res.body)

    expect(res.body.success).toBe(true);
  });
});