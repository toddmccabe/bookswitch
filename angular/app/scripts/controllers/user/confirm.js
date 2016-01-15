bookSwitchApp.controller('UserConfirmController', function($scope, $state, $stateParams, User) {
  var user = new User();

  $scope.confirmed = true;

  user.token = $stateParams.token;

  user.$confirm({
  }, function() {
    $state.go('user.login', {
      confirmed: true
    })
  }, function() {
    $scope.confirmed = false;
  });
});
