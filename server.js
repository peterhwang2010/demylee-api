var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config');
var Customer = require('./app/models/customer');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var dbConfig = config.get('User.dbConfig');
var dbURL = 'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@ds023644.mlab.com:23644/demylee';

mongoose.connect(dbURL);

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next){
	console.log('Something is happening');
	next();
});

router.route('/customers')
	
	.post(function(req, res){
		var customer = new Customer();
		
		customer.company_name = req.body.company_name;
		customer.street_address = req.body.street_address;
		customer.city = req.body.city;
		customer.state = req.body.state;
		customer.zipcode = req.body.zipcode;

		customer.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Customer created successfully'});
		});
	});

router.route('/customers')

	.get(function(req, res){
		Customer.find(function(err, customers){
			if (err)
				res.send(err);
			res.json(customers);
		});
	});

router.get('/', function(req, res){
	res.json({message: 'success'});
});

app.use('/api', router);

app.listen(port);
console.log('Listening to port ' + port);