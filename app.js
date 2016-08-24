var express = require('express');
var app = express();
var volleyball = require('volleyball');
var bodyParser = require('body-parser');
var swig = require('swig');
var Model = require('./models');
var path = require('path'); 

var Hotel = Model.hotel;
var Restaurant = Model.restaurant;
var Activity = Model.activity;

swig.setDefaults({cache: false});
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(express.static(__dirname + '/node_modules/bootstrap')); 
app.use(express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist'))); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(volleyball);
app.use(express.static(__dirname + '/public'));

app.use(function(err, req, res, next) {
	console.log("Oh noes!!!!!");
	console.log(err, err.stack);
});

app.get('/', function(req, res){
		Promise.all([Hotel.findAll({}), Restaurant.findAll({}), Activity.findAll({})])	
		.then( function(allData){
			res.render('index', { Hotels: allData[0], Restaurants: allData[1], Activities: allData[2]  });
		})
})

app.listen(3000, function() {
	console.log("Server is listening intently at port 3000...")
});
