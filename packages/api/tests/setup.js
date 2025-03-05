require("dotenv").config({ path: ".env.test" });
const { sequelize } = require("../config/db");

beforeAll(async () => {
  console.log(`Running tests with DB: ${process.env.MYSQL_DATABASE}`);
  if (!sequelize) {
    throw new Error("Sequelize instance is undefined");
  }
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  if (sequelize) {
    await sequelize.close();
  }
});
