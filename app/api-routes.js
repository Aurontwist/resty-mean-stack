var express = require('express');
var apiRouter = express.Router();
var User = require('../app/models/user');

module.exports = function (app) {

    apiRouter.get('/', function(req,res){
        res.json({message : 'API is runnig!'});
    });

    apiRouter.route('/users')
        .post(function (req, res) {
            var user = new User();
            user.name = req.body.name;


            user.save(function (err) {
                if (err) res.send(err);
                res.json({message: "User " + user.name + " Created!"});
            });
        })
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err) {
                    res.send(err)
                };

//                else if (!users.length) {
//                    res.json({message: 'Sorry there is no users in our database!'});
//                };
                res.json(users);
            });
        });

    apiRouter.route('/users/:user_id')
        .get(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) res.send(err);
                res.json(user);
            });
        })

        .put(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) {
                    res.send(err)
                } else if ( !user ) {
                    res.json({
                        message : "User does not exist!"
                    });
                };

                user.name = req.body.name;
                user.save(function (err) {
                    if (err) res.send(err);
                    res.json({message: 'User name has been modifyed successfully!'});
                });
            });
        })

        .delete(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) res.send(err);
                if (user) {
                    res.userName = user.name;
                }
            });
            User.remove({ _id: req.params.user_id}, function (err, user) {
                if (err) res.send(err);

                res.json({message: res.userName + ' Deleted!'});


            });
        });
    apiRouter.route('/get/id/by/name/:user_name')
        .get(function(req, res){
            User.find({ name : req.params.user_name }, function(err, list){
                if (err) {
                    res.send(err);

                } else if ( list.length == 0 ) {
                    res.json({message : "Sorry! No User with name " + req.params.user_name + " !"});
                }

                res.json(list);
            })
        });

        app.use('/api' , apiRouter);
};