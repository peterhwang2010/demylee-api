var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var dbConfig = config.get('User.dbConfig');
var dbURL = 'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@ds023644.mlab.com:23644/demylee';

mongoose.connect(dbURL);

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
	res.json({message: 'success'});
});

app.use('/api', router);

app.listen(port);
console.log('Listening to port ' + port);