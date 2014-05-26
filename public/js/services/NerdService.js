angular.module('nerd.service', [])
    .factory('Nerd', [ '$http', function ($http){
            return {
                get : function(){
                    return $http.get('/api/users');
                },

//                getUserByNaem : function(name){
//                    return $http.get('/api/users/' + name);
//                },

                getUserId : function(name){
                    return $http.get('/api/get/id/by/name/' + name);
                },


                create : function(nerdData){
                    return $http.post('/api/users', nerdData);
                },

                remove : function(id){
                    return $http.delete('/api/users/' + id);
                }

            }
    }]);