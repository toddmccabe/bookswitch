angular.module('bookSwitchApp').controller('UserNewController', function(
  $scope,
  User
) {
  $scope.user = new User();
  $scope.created = false;

  $scope.create = function() {
    $scope.user.$save({}, function() {
      $scope.created = true;
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  };
});
