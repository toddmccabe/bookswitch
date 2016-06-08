angular.module('bookSwitchApp').controller('UserConfirmController', function(
  $scope,
  $state,
  $stateParams,
  User
) {
  User.confirm({
    token: $stateParams.token
  }, function() {
    $state.go('user.login', {
      confirmed: true
    });
  }, function() {
    $scope.confirmed = false;
  });
});
