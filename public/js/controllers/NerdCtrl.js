angular.module('nerd.module', [])
    .controller('NerdController', function($scope, Nerd){
        $scope.tagline = "Nerd page!";
        $scope.nerds = [];


        Nerd.get().success(function(data){
            $scope.nerds = data;
        });


        $scope.addNerd = function(newName){

            // Check if element exists
            var notExist = true;

            for(var i = 0; i < $scope.nerds.length; i++){
                if ( $scope.nerds[i].name == newName) {
                    notExist = false;
                    return;
                }
            }

            // If not exists add it to the list of nerds

            if(notExist){
                var data = {
                    name : newName
                };
                Nerd.create(data).success(function(){
                    Nerd.getUserId(newName).success(function(userlist){
                        data._id = userlist[0]._id;
                        data.creationDate = userlist[0].creationDate;
                    });
                    $scope.nerds.push(data);
                    $scope.newNerdName = "";
                });
            }

        };

        $scope.deleteNerd = function(index){
            var person_to_delete = $scope.nerds[index];

            Nerd.remove( person_to_delete._id).success( function(){
                $scope.nerds.splice(index, 1);
            });


        };

//        $scope.$watch('nerds', function() {
//            Nerd.get().success(function(data){
//                $scope.nerds = data;
//            });
//        }, true);

    });