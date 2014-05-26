var express = require('express');
var router = express.Router();

module.exports = function(app){

    router
        .get( /(?!^\/api).*/ ,  function(req, res){
            res.sendfile('./public/index.html', function(err){
                if(err) res.send(err);
            })
        });

    app.use('/' , router);

};