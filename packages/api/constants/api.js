const auth = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

const api = {
  API_URL: `${process.env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  PORT: process.env.APP_PORT,
};

module.exports = { auth, api };
