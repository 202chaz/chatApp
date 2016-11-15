var app = angular.module("chatApp", []);

app.controller("chatCtrl", function($scope, socket) {
  var user = [];
  $scope.users =[];
  $scope.hideMe = false;
  $scope.getName = function(c){
    var day = new Date;
    var id = day.getTime();
    user.push(c,id);
    $scope.hideMe = true;
    $('#name').val(' ');
    // Pushes data to server
    socket.emit('test', user);
    // Get Users from server
    socket.on('users', function(user) {
      $scope.users.push($.extend({}, user[0]));
      $scope.test = $scope.users[0];
      $('#user-list').append('<li> '+$scope.users[0][0]+'</li>');
    });

  }
  
});