const mongoose  = require('mongoose');

var contacts = mongoose.model('contacts', {
	name: {type: String},
	phoneNumber: {type: String},
	address: {type: String},
	gender: {type: String},
	shortBio: {type: String},
	customFile: {type: String}
});

module.exports = {contacts}; 