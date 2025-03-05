const axios = require('axios');
const app = require('../../src/index');
const { auth, api } = require('../../constants/api');

const { register } = auth;
const { API_URL, PORT } = api;

describe("Minimal Auth API Test", () => {
  let server;
  let testUser = { name: "John Doe", email: "john@example.com", password: "test1234" };

  beforeAll((done) => {
    server = app.listen(PORT, () => done());
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve)); // Properly close Express server
    }
  });

  test("User can register", async () => {
    const response = await axios.post(`${API_URL}${register}`, testUser);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("message", "User registered successfully");
  });
});
