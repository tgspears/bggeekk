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