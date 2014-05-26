module.exports = function(app){
    // Server routes =========================

    // API route =============================

    app.get('/api/nerds',  function(req, res){
           Nerd.find(function(err, nerds){

               if(err) res.send(err); // if err

               res.json(nerds); // return all nerds in json format
           });
    });

    // frontend routes ======================

    app.get('*', function(req, res){
        res.sendfile('./public/index.html'); // load our public/index.html file
    });
};