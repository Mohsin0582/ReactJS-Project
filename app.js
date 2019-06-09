//package modules
const express=require('express');
const bodyParser=require('body-parser');

//local modules
//var {mongoose} =require('./db.js');

var app = express();
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + 'public'));
app.set('views', __dirname+'/views');
app.set('view engine', 'pug');

app.get('/', function (req, res){res.send('Hello')});

app.listen(3000, ()=>{ console.log('Server started at port : 3000')});