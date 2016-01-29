var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var request = require('request');
var db = require('../models');
var parseString = require('xml2js').parseString;

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',function(req,res){
    if(req.getUser()){
        var userId = req.getUser();
        db.listgame.findAll({
            where:({
                userId:userId.id
            })
        })
        .then(function(listData){
            res.render('lists',{listData:listData, userId:userId.name});
        })
    } else {
        res.redirect('auth/login');
    }
});

router.post('/tryit',function(req,res){
    if(req.getUser()){
        var gameId = req.body.tryitHidId;
        var user = req.getUser();

        db.listgame.findOrCreate({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .spread(function(game,created){
            var url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
            request(url,function(error,response,data){
                parseString(data, function (err, result){
                    game.tryIt=true,
                    game.love=false,
                    game.own=false,
                    game.suggested=false,
                    game.gameName = result.boardgames.boardgame[0].name[0]._,
                    game.thumbUrl=result.boardgames.boardgame[0].thumbnail[0],
                    game.save().then(function(userEntries){
                        res.redirect('/lists');
                    })
                })
            })
        })
    } else {
        res.redirect('/auth/login')
    }
});

router.post('/love',function(req,res){
    if(req.getUser()){
        var gameId = req.body.loveHidId;
        var user = req.getUser();

        db.listgame.findOrCreate({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .spread(function(game,created){
            var url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
            request(url,function(error,response,data){
                parseString(data, function (err, result){
                    game.tryIt=false,
                    game.love=true,
                    game.own=false,
                    game.suggested=false,
                    game.gameName = result.boardgames.boardgame[0].name[0]._,
                    game.thumbUrl=result.boardgames.boardgame[0].thumbnail[0],
                    game.save().then(function(gameData){
                        res.redirect('/lists');
                    })
                })
            })
        })
    } else {
        res.redirect('/auth/login')
    }
});

router.post('/own',function(req,res){
    if(req.getUser()){
        var gameId = req.body.ownHidId;
        var user = req.getUser();

        db.listgame.findOrCreate({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .spread(function(game,created){
            var url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
            request(url,function(error,response,data){
                parseString(data, function (err, result){
                    game.tryIt=false,
                    game.love=false,
                    game.own=true,
                    game.suggested=false,
                    game.gameName = result.boardgames.boardgame[0].name[0]._,
                    game.thumbUrl=result.boardgames.boardgame[0].thumbnail[0],
                    game.save().then(function(gameData){
                        res.redirect('/lists');
                    })
                })
            })
        })
    } else {
        res.redirect('/auth/login')
    }
});

router.delete('/:id',function(req,res){
    db.listgame.destroy({
        where:{
            id:req.params.id
        }
    }).then(function(){
        res.redirect('/lists');
    });
});

router.post('/tryit/:id',function(req,res){
    db.listgame.find({
        where:{
            id:req.params.id
        }
    }).then(function(game){
        game.tryIt=true,
        game.love=false,
        game.own=false,
        game.suggested=false
        game.save().then(function(){
            res.redirect('/lists');
        })
    })
})

router.post('/love/:id',function(req,res){
    db.listgame.find({
        where:{
            id:req.params.id
        }
    }).then(function(game){
        game.tryIt=false,
        game.love=true,
        game.own=false,
        game.suggested=false
        game.save().then(function(){
            res.redirect('/lists');
        })
    })
})

router.post('/own/:id',function(req,res){
    db.listgame.find({
        where:{
            id:req.params.id
        }
    }).then(function(game){
        game.tryIt=false,
        game.love=false,
        game.own=true,
        game.suggested=false
        game.save().then(function(){
            res.redirect('/lists');
        })
    })
})

module.exports = router;