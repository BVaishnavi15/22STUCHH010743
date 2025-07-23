const axios = require('axios');
const LOG_API = 'http://20.244.56.144/evaluation-service/logs';
const log = async (stack, level, pkg, message) => {
  try {
    const body = {
      stack: stack.toLowerCase(),
      level: level.toLowerCase(),
      package: pkg.toLowerCase(),
      message,
    };
    const response = await axios.post(LOG_API, body);
    console.log('Log Response:', response.data);
  } catch (err) {
    console.error('Log Failed:', err.message);
  }
};
const loggerMiddleware = (req, res, next) => {
  log('backend', 'info', 'middleware', `Incoming request: ${req.method} ${req.url}`);
  next();
};
module.exports = { log, loggerMiddleware };
