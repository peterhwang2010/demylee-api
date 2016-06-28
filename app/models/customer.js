var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	company_name: String,
	street_address: String,
	city: String,
	state: String,
	zipcode: Number
});

module.exports = mongoose.model('Customer', CustomerSchema);