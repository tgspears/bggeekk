var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var request = require('request');
var db = require('../models');
var request = require('request');
var parseString = require('xml2js').parseString;
var cheerio = require('cheerio');

router.use(bodyParser.urlencoded({extended:false}));

router.get('/',function(req,res){
    if(req.getUser()){
        res.render('lists');
    }else{
        res.redirect('auth/login');
    }
});

router.post('/tryit',function(req,res){
    if(req.getUser()){
        var gameId = req.body.tryitHidId;
        var gameThumb = req.body.tryitHidThumb;
        var user = req.getUser();

        console.log('clicked tryit');
        console.log(gameId);

        db.listgame.find({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .then(function(game){
            console.log('top of if')
            if(game){
                console.log('found match');
                game.tryIt=true,
                game.love=false,
                game.own=false,
                game.suggested=false
                game.save().then(function(){
                    db.listgame.findAll({
                        where:({
                            userId:user.id
                        })
                    })
                    .then(function(userEntries){
                        var gamesArr = {};
                        for(var i=0;i<userEntries.length;i++){
                            gamesArr[i] = db.listgame.find({
                                where:({
                                    gameId:userEntries[i].gameId
                                })
                            })
                        }
                        // res.send(userEntries);
                        res.render('lists',{userEntries: userEntries},gamesArr);
                    })
                })
            }else{
                console.log('did not find match'+gameId);
                url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
                request(url,function(error,response,data){
                    console.log('inside request')
                    parseString(data, function (err, result){
                        db.listgame.create({
                            userId:user.id,
                            gameId:gameId,
                            tryIt:true,
                            love:false,
                            own:false,
                            suggested:false
                        }).then(function(){
                            db.listgame.findAll({
                                where:({
                                    userId:user.id
                                })
                            })
                            .then(function(userEntries){
                                // res.send(userEntries);
                                res.render('lists',{userEntries:userEntries});
                            })
                            // res.render('lists');
                        })
                    })
                })
            }
        })
    }else{
        res.redirect('../auth/login');
    }
})

router.post('/love',function(req,res){
    if(req.getUser()){
        var gameId = req.body.loveHid;
        var user = req.getUser();

        console.log('clicked love');
        console.log(gameId);

        db.listgame.find({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .then(function(game){
            console.log('top of if')
            if(game){
                console.log('found match');
                game.tryIt=false,
                game.love=true,
                game.own=false,
                game.suggested=false
                game.save().then(function(){
                    res.render('lists');
                })
            }else{
                console.log('did not find match'+gameId);
                url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
                request(url,function(error,response,data){
                    console.log('inside request')
                    parseString(data, function (err, result){
                        db.listgame.create({
                            userId:user.id,
                            gameId:gameId,
                            name:result.boardgames.boardgame[0].name[0],
                            thumbUrl:result.boardgames.boardgame[0].thumbnail[0],
                            tryIt:false,
                            love:true,
                            own:false,
                            suggested:false
                        }).then(function(){
                            res.render('lists')
                        })
                    })
                })
            }
        })
    }else{
        res.redirect('../auth/login');
    }
})

router.post('/own',function(req,res){
    if(req.getUser()){
        var gameId = req.body.ownHid;
        var user = req.getUser();

        console.log('clicked own');
        console.log(gameId);

        db.listgame.findAll({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .then(function(game){
            console.log(game);
            console.log('top of if')
            if(game){
                console.log('found match');
                game.tryIt=false,
                game.love=false,
                game.own=true,
                game.suggested=false
                game.save().then(function(){
                    res.render('lists');
                })
            }else{
                console.log('did not find match'+gameId);
                url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
                request(url,function(error,response,data){
                    console.log('inside request')
                    parseString(data, function (err, result){
                        db.listgame.create({
                            userId:user.id,
                            gameId:gameId,
                            name:result.boardgames.boardgame[0].name[0],
                            thumbUrl:result.boardgames.boardgame[0].thumbnail[0],
                            tryIt:false,
                            love:false,
                            own:true,
                            suggested:false
                        }).then(function(){
                            res.render('lists')
                        })
                    })
                })
            }
        })
    }else{
        res.redirect('../auth/login');
    }
})

// router.post('/suggested',function(req,res){
//     var gameId = req.params.id;
//     var user = req.getUser();

//     console.log('clicked suggested')

//     db.listgame.find({
//         where:{
//             gameId:gameId,
//             userId:user.id
//         }.then(function(game){
//             if(game){
//                 game.tryIt=false,
//                 game.love=false,
//                 game.own=false,
//                 game.suggested=true
//                 game.save().then(function(){
//                     res.render('lists');
//                 })
//             }else{
//                 request("http://boardgamegeek.com/xmlapi/boardgame/"+gameId,function(error,response,data){
//                     if (!error && response.statusCode == 200){
//                         db.listgame.create({
//                             userId:user.id,
//                             gameId:gameId,
//                             name:data.boardgames.boardgame[0].name[0],
//                             thumbUrl:data.boardgames.boardgame[0].thumbnail[0],
//                             tryIt:false,
//                             love:false,
//                             own:false,
//                             suggested:true
//                         }).then(function(){
//                             res.redirect('lists')
//                         })
//                     }
//                 })
//             }
//         })
//     })
// })

module.exports = router;