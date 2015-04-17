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


router.get('/:gameId',function(req,res){
	var gameId = req.params.gameId;
	var url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
	var gameData = request(url,function(error,response,data){
		if (!error && response.statusCode == 200){
			parseString(data, function (err, result) {
				res.render('gameDeets',result);
			})
		}
	})
});

router.use(bodyParser.urlencoded({extended:false}));

module.exports = router;










// When resultBtn is clicked
	// Take the information in the hidden field hidId
	// Put that information into another api query
	// http://boardgamegeek.com/xmlapi/boardgame/<hidId>

// <input type="hidden" id="hiddenId" name="hidId" value="<%= boardgame[i].$.objectid %>">
// <input type="hidden" id="hiddenName" name="hidName" value="<%= boardgame[i].name[0]._.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase() %>">