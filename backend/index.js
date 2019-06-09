//package modules
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

//local modules
var {mongoose} =require('./db.js');
var contactsController = require('./controllers/contactsController');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3001'}));

app.listen(3000, ()=>{ console.log('Server started at port : 3000')});

app.use((req, res, next) => {
    setTimeout(() => next(), 3000);
});

app.use('/contacts', contactsController );


