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
        console.log('user id /lists',userId)
        db.listgame.findAll({
            where:({
                userId:userId.id
            })
        })
        .then(function(listData){
            res.render('lists',{listData:listData});
        })
    }else{
        res.redirect('auth/login');
    }
});

router.post('/tryit',function(req,res){
    if(req.getUser()){
        var gameId = req.body.tryitHidId;
        var user = req.getUser();

        console.log('clicked tryit');
        console.log(gameId);

        db.listgame.findOrCreate({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .spread(function(game,created){
            var url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
            request(url,function(error,response,data){
                console.log('inside request');
                parseString(data, function (err, result){
                    // return res.send(result);
                    game.tryIt=true,
                    game.love=false,
                    game.own=false,
                    game.suggested=false,
                    game.gameName = result.boardgames.boardgame[0].name[0]._,
                    game.thumbUrl=result.boardgames.boardgame[0].thumbnail[0],
                    game.save().then(function(userEntries){
                            console.log('saved data, redirecting')
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

        console.log('clicked love');
        console.log(gameId);

        db.listgame.findOrCreate({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .spread(function(game,created){
            var url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
            request(url,function(error,response,data){
                console.log('inside request');
                parseString(data, function (err, result){
                    // return res.send(result);
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
    }else {
        res.redirect('/auth/login')
    }
});

router.post('/own',function(req,res){
    if(req.getUser()){
        var gameId = req.body.ownHidId;
        var user = req.getUser();

        console.log('clicked love');
        console.log(gameId);

        db.listgame.findOrCreate({
            where:({
                gameId:gameId,
                userId:user.id
            })
        })
        .spread(function(game,created){
            var url = "http://boardgamegeek.com/xmlapi/boardgame/"+gameId;
            request(url,function(error,response,data){
                console.log('inside request');
                parseString(data, function (err, result){
                    // return res.send(result);
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
    }else {
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