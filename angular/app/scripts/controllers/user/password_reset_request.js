angular.module('bookSwitchApp')
.controller('UserPasswordResetRequestController', function(
  $scope,
  User
) {
  $scope.resetPassword = function() {
    User.passwordResetRequest({
      usernameEmail: $scope.usernameEmail
    }, function() {
      $scope.passwordReset = true;
    }, function(response) {
      $scope.errors = response.data.errors
    });
  }
});
