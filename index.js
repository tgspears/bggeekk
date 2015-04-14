var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
var db = require('./models');
var request = require('request');
var cheerio = require('cheerio');
var parseString = require('xml2js').parseString;
var searchCtrl = require("./controllers/search");
var resultsCtrl = require('./controllers/results');
var listsCtrl = require("./controllers/lists");

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
	secret:'huehuehue',
	resave: false,
	saveUninitialized:true
}));
app.use(flash());

app.use("/",searchCtrl);
app.use("/results",resultsCtrl);
app.use("/lists",listsCtrl);

app.use(express.static(__dirname + "/public"));

app.listen(3000, function(){
	console.log("Alright, thumbs up? Let's do this! LEEEERRROOOOOY JEEEEENNNNKIIIINNNSSSSSSS!!!11!!1One!1")
});

