var express = require('express');
var request = require('request');

var app     = express();
app.use('/', express.static('./main/'));
app.use('/lib', express.static('./bower_components/'));

var http    = require('http').Server(app);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(process.env.PORT || 4000, process.env.IP || "0.0.0.0", function(){
  console.log("Serveur web en cour");
});
