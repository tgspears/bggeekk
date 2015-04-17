var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
var bcrypt = require('bcrypt');
var db = require('./models');
var request = require('request');
var cheerio = require('cheerio');
var parseString = require('xml2js').parseString;
var searchCtrl = require("./controllers/search");
var resultsCtrl = require('./controllers/results');
var listsCtrl = require("./controllers/lists");
var authCtrl = require("./controllers/auth");

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret:'huehuehue',
	resave: false,
	saveUninitialized:true
}));

app.use(flash());

//custom middleware - is user logged in
app.use(function(req,res,next){
	// req.session.user = {
	// 	id: 5
	// }
	req.getUser = function(){
		return req.session.user || false;
	}
	next();
});

app.use("/",searchCtrl);
app.use("/results",resultsCtrl);
app.use("/lists",listsCtrl);
app.use("/auth",authCtrl);

app.use(express.static(__dirname + "/public"));

app.listen(process.env.PORT || 3000)