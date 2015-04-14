var request = require('request');
var cheerio = require('cheerio');

searchTest = function(searchTerm){
	request("http://boardgamegeek.com/xmlapi/search?search="+searchTerm, function(error, response, data) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(data);
			var name = $('name').map(function(index,element){
				return $(this).text();
			})
			var storage = {};
			for(var i=0;i<name.length;i++){
				storage[i]=name[i];
			}
			console.log(storage);
		}
	})
}



searchTest('arkham');