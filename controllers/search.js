var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var request = require('request');
var db = require('../models');
var request = require('request');
var cheerio = require('cheerio');
var parseString = require('xml2js').parseString;
router.use(bodyParser.urlencoded({extended:false}));

router.get("/", function(req,res){
	var user = req.getUser();
	var alerts = req.flash();
	res.render("index",{user:user,alerts:alerts});
})

router.get('/search',function(req,res){
	var searchTerm = req.query.q;
	var url = "http://boardgamegeek.com/xmlapi/search?search="+searchTerm;

	var gameData = request(url, function(error, response, data){
		if (!error && response.statusCode == 200){
			parseString(data, function (err, result) {
				res.render('results',result);
			})
		}
	})
})

module.exports = router;