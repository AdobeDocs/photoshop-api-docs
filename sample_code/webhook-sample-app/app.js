const HTTP = require('http');
const express = require('express');
const bodyParser = require('body-parser');
 
let app = express();
app.use(bodyParser.json({ limit: '10mb' }));
 
app.get('/', function(req, res) {
  res.end(req.query.challenge);
});
 
app.post('/', function(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  res.end();
});
 
let startServer = function() {
  HTTP.createServer(app).listen(8888);
  console.log( { "events-server": "started" });
}
 
startServer();
