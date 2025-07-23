const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
const externalApiUrl = 'http://20.244.56.144/evaluation-service/logs';
app.post('/p', async (req, res) => {
  const { stack, level, package: pkg, message } = req.body;
  if (!stack || !level || !pkg || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const logData = {
    stack,
    level,
    package: pkg,
    message,
  };
  try {
    const response = await axios.post(externalApiUrl, logData);
    res.status(201).json({
      message: 'Log forwarded successfully',
      externalResponse: response.data
    });
  } catch (error) {
    console.error('Error forwarding to external API:', error.message);
    res.status(500).json({ error: 'Failed to forward log to external service' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
