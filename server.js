const express = require('express');
const serveWebpackClient = require('serve-webpack-client');
const path = require('path');
const app = express();
app.use('/', express.static(path.join(__dirname, 'dist')))
app.listen(3000);
console.log('App running on port 3000!')
