bookSwitchApp.controller('UserNewController', function($scope, User, Error) {
  var user = new User();

  $scope.email = '';
  $scope.username = '';
  $scope.password = '';
  $scope.created = false;

  $scope.create = function() {
    user.email = $scope.email;
    user.username = $scope.username;
    user.password = $scope.password;

    user.$save({
    }, function() {
      $scope.created = true;
    }, function(response) {
      $scope.errors = Error.parse(response.data.errors);
    });
  }
});
