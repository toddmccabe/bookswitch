angular.module('bookSwitchApp').controller('UserLoginController', function(
  $scope,
  $state,
  $stateParams,
  $location,
  Session,
  SiteData
) {
  var session = new Session();

  $scope.rememberMe = false;
  $scope.loginFailed = false;
  $scope.confirmed = $stateParams.confirmed;
  $scope.afterURL = $stateParams.afterURL;
  $scope.passwordUpdated = $stateParams.passwordUpdated;

  $scope.login = function() {
    // get actual values from input elements
    // two-way data binding is broken by autocomplete
    session.usernameEmail = $('#usernameEmail').val();
    session.password = $('#password').val();

    session.$save({}, $scope.handleLoginSuccess, function(response) {
      $scope.loginFailed = true;
      $scope.errors = response.data.error;
    });
  };

  $scope.handleLoginSuccess = function(response) {
    if($scope.rememberMe) {
      SiteData.set('saveToCookie', true);
    }

    SiteData.set('authentication_token', response.authentication_token);
    SiteData.set('username', response.username);

    if($scope.afterURL) {
      location.href = decodeURIComponent(decodeURIComponent($scope.afterURL));
    } else {
      $state.go('user.show', {
        username: response.username
      });
    }
  };
});
