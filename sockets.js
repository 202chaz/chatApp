var app = angular.module("chatApp", []);

app.controller("chatCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});