// server.js

// load modules ===============================================

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

// Configuratipn ===============================================
app.use(bodyParser());

app.use(morgan('dev'));
//app.use(express.static(__dirname + '/public'));

var db = require('./config/db');
var User = require('./app/models/user');
mongoose.connect(db.url);

var port = process.env.PORT || 8080;

//mongoose.connect(db.url);

// Routes ===============================================
var router = express.Router();

// Setting up a middleware to use for all requests
router.use(function(req, res, next){
    // Some logging goes here
    console.log('Something is happening');
    next(); // Make sure that we go to the next route and don't stop here!
});


router.get('/', function(req,res){
    res.json({message : 'hooray! welcome to our api!'});
});

router.route('/users')
    .post(function(req, res){
        var user = new User();
        user.name = req.body.name;

        user.save(function(err){
            if(err) res.send(err);
            res.json({message : "User Created!"});
        });
    })
    .get(function(req, res){
        User.find(function(err, users){
            if(err) {
                res.send(err)
            } else if ( !users.length ){
                res.json({message : 'Sorry there is no users in our database!'});
            };
            res.json(users);
        });
    });

router.route('/users/:user_id')
    .get(function(req, res){
        User.findById( req.params.user_id, function(err, user){
            if (err) res.send(err);
            res.json(user);
        });
    })
    .put(function(req,res){
        User.findById(req.params.user_id, function(err,user){
            if(err) res.send(err);

            user.name = req.body.name;
            user.save(function(err){
                if (err) res.send(err);
                res.json({message: 'User name has been modifyed successfully!'});
            });
        });
    })
    .delete(function(req,res){
        User.findById(req.params.user_id, function(err, user){
            if (err) res.send(err);
            res.userName = user.name;
        });
        User.remove({ _id: req.params.user_id}, function(err, user){
            if (err) res.send(err);

                res.json({message : res.userName + ' Deleted!'});


        });
    });

app.use('/api' , router);



// Start App ===============================================

app.listen(port);
console.log('Magic happend on port: ' + port);