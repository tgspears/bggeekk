var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var request = require('request');
var db = require('../models');
var request = require('request');
var parseString = require('xml2js').parseString;

router.use(bodyParser.urlencoded({extended:false}));

router.get("/", function(req,res){
	var user = req.getUser();
	req.flash('info', 'Flash is back!')
	res.render("index", { user: user, message: req.flash('info') });
})

router.get('/search',function(req,res){
	if(req.query.q.length > 2){
		var searchTerm = req.query.q;

		var url = "http://boardgamegeek.com/xmlapi/search?search="+searchTerm;

		request(url, function(error, response, data){
			if (!error && response.statusCode == 200){
				parseString(data, function (err, result) {
					res.render('results',result);
				})
			}
		})

	} else { res.alert('needs more'); }
})

module.exports = router;