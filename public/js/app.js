var app = angular.module("chatApp", []);

app.controller("chatCtrl", function($scope, socket) {
  $scope.hideMe = false;
  
  $scope.getName = function(users){
    var day = new Date;
    var id = day.getTime();
    // Pushes data to server
    socket.emit('new-user', users.toString(), function(data) {
      if(data) {
        //console.log(data);
      }
    }); 
    $('#name').val(' ');
    $scope.hideMe = true;   
  }
  
  socket.on('get-users', function(user) {
    var html = '';
  	for(i = 0; i < user.length; i++){
  		html += '<li>'+user[i]+'</li>';
  	}
    $('#user-list').html(html);
  });
  
  
  $scope.getMessage = function(data) {
    
    socket.emit('send-message', data);
    $('#message').val('');
  }
  socket.on('new-message', function(data) {
    $('#chat').append('<div class="chatMessage">'+data.msg+'</div><br/ ><div>'+data.user+' '+$scope.time+'</div>');
  });
  
  $scope.curTime = function() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    
    function gethour(a) {
      if (a > 12) {
        return a - 12;
      }
    }
    
    function addZero(b) {
      if (b < 10) {
        b = "0" + b;
      }
      return b;
    }
    
    function checkDay(c) {
      if (c<11) {
        return 'AM';
      } else {
        return 'PM';
      }
    }
    
    $scope.time = gethour(h)+(':')+addZero(m)+ ' '+checkDay(h);
  }
  
});