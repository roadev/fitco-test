const auth = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

const api = {
  API_URL: `${process.env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
};

module.exports = { auth, api };
