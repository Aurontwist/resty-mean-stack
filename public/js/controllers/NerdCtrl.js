angular.module('nerd.module', [])
    .controller('NerdController', function($scope, Nerd){
        $scope.tagline = "Nerd page!";
        $scope.nerds = Nerd.get();
        $scope.addNerd = Nerd.create();
    });