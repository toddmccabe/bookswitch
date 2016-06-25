angular.module('bookSwitchApp').controller('UserConfirmController', function(
  $scope,
  $state,
  $stateParams,
  User
) {
  User.confirm({
    authentication_token: $stateParams.authentication_token
  }, function() {
    $state.go('user.login', {
      confirmed: true
    });
  }, function() {
    $scope.confirmed = false;
  });
});
