bookSwitchApp.controller('UserNewController', function($scope, User) {
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
      $scope.errors = [];

      angular.forEach(response.data.errors, function(errorsArray, key) {
        angular.forEach(errorsArray, function(error) {
          this.push(key + ' ' + error);
        }, $scope.errors);
      });
    });
  }
});
