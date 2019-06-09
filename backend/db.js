const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/contactinformation", (err) => {
	if(!err)
		console.log("MongoDB Connection successful!");
	else{
		console.log("MongoDB Connection failed : " + JSON.stringify(err, undefined,2));
		//console.log("Connection failed : " + (err));
	}
});

module.exports = mongoose;