require("dotenv").config({ path: ".env.test" });
const { sequelize } = require("../config/db");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
