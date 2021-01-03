const cors = require('cors');
const path = require('path');
const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, '../', 'public/');
  app.use(express.static(publicPath));
  app.get(/.*/, (req, res) => res.sendFile(publicPath + 'index.html'));
}

app.get(/.*/, (req, res) => res.send('hello from server'));

app.listen(port, () => console.log(`server listening to port ${port}...`));
