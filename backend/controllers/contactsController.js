const express = require('express');
const router = express.Router();

var {contacts} = require('../models/contacts');
var multer  = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
	  cb(null, file.fieldname + '-' + Date.now())
	}
  })
   
  var upload = multer({ storage: storage })

// localhost:3000/contacts
router.get( '/', (req, res)=> {
	contacts.find( (err, docs)=>{
		if(!err){res.send(docs);}
		else{console.log("Contact documents not found : " + JSON.stringify(err, undefined, 2));}
		});	
});

router.post('/', upload.single('avatar'), (req, res, next)=> {

	var contact = new contacts ({
		name: req.body.name,
		phoneNumber: req.body.phoneNumber,
		address: req.body.address,
		gender: req.body.gender,
		shortBio: req.body.shortBio,
		customFile: req.body.customFile
	});	

	contact.save((err, docs)=>{
			if(!err){res.send(docs);}
			else{console.log("Contact documents not found : " + JSON.stringify(err, undefined, 2));}

		
	});	
});

module.exports = router;