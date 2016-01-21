bookSwitchApp.controller('UserNewController', function($scope, User, Error) {
  $scope.user = new User();
  $scope.created = false;

  $scope.create = function() {
    $scope.user.$save({
    }, function() {
      $scope.created = true;
    }, function(response) {
      $scope.errors = Error.parse(response.data.errors);
    });
  }
});
