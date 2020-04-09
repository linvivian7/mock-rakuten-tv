const express = require('express');
const compression = require('compression');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(compression());

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  if (req.url.indexOf('.js') > 0) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
  }
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(port);
