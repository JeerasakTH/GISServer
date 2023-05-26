const { config } = require("dotenv");
config();

module.exports = {
  PORT: process.env.PORT || 8080,
  SECRET: process.env.SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  // SERVER_URL: process.env.SERVER_URL,
  // CLIENT_URL: process.env.CLIENT_URL,
};
