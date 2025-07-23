const express = require('express');
const { log, loggerMiddleware } = require('./loggerMiddleware');
const app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.get('/', async (req, res) => {
  await log('backend', 'debug', 'handler', 'Root path accessed');
  res.send('Hello from backend!');
});
app.get('/error', async (req, res) => {
  await log('backend', 'error', 'handler', 'received string, expected bool');
  res.status(500).send('Something went wrong');
});
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
