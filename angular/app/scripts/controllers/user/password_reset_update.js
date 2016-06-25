angular.module('bookSwitchApp')
.controller('UserPasswordResetUpdateController', function(
  $scope,
  $state,
  $stateParams,
  User
) {
  $scope.updatePassword = function() {
    User.passwordResetUpdate({
      password: $scope.password,
      password_reset_token: $stateParams.passwordResetToken
    }, function() {
      $state.go('user.login', {
        passwordUpdated: true
      });
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  }
});
