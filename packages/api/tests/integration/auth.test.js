const axios = require('axios');
const app = require('../../');
const { auth, api } = require('../../constants/api');

const { register, login } = auth;
const { API_URL, PORT } = api;

describe("Auth API Integration Tests", () => {
  let server;
  let testUser = { name: "John Doe", email: "john@example.com", password: "test1234" };

  beforeAll((done) => {
    server = app.listen(PORT, () => done());
  });

  afterAll((done) => {
    server.close(() => done());
  });

  test("User can register", async () => {
    const response = await axios.post(`${API_URL}${register}`, testUser);
    
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("message", "User registered successfully");
  });

  test("User can log in and receive a token", async () => {
    const response = await axios.post(`${API_URL}${login}`, {
      email: testUser.email,
      password: testUser.password
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("token");
  });
});
