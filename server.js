const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));

app.get('*', (req, res, next) => {
  if (req.url.indexOf('.js') > 0 || req.url.indexOf('.css') > 0) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  } else {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
  }
});

app.listen(port);
