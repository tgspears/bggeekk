router.get("/", function(req,res){
	var user = req.getUser();
	var alerts = req.flash();
	res.render("index",{user:user,alerts:alerts});
})

router.get('/search',function(req,res){
	var searchTerm = req.query.q;
	var url = "http://boardgamegeek.com/xmlapi/search?search="+searchTerm;

	request(url, function(error, response, data){
		if (!error && response.statusCode == 200){
			parseString(data, function (err, result) {
				res.render('results',result);
			})
		}
	})
})

module.exports = router;