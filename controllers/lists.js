var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var request = require('request');
var db = require('../models');
var request = require('request');
var cheerio = require('cheerio');

router.use(bodyParser.urlencoded({extended:false}));

router.get("/", function(req,res){
	res.render("lists");
});

module.exports = router;