bookSwitchApp.controller('UserLoginController', function($scope, $cookies, $state, $stateParams, appConfig, Session) {
  var session = new Session();

  $scope.usernameEmail = '';
  $scope.password = '';
  $scope.rememberMe = false;
  $scope.loginFailed = false;
  $scope.confirmed = !!$stateParams.confirmed;

  $scope.login = function() {
    session.usernameEmail = $scope.usernameEmail;
    session.password = $scope.password;
    var cookiesOptions = {};

    session.$save({
    }, function(response) {
      if($scope.rememberMe) {
        cookiesOptions.expires = new Date((new Date()).getTime() + appConfig.cookieExpirationInDays * 24 * 60 * 60 * 1000);
      }

      $cookies.put('token', response.token, cookiesOptions);
      $cookies.put('username', response.username, cookiesOptions);

      $state.go('user.show', {
        id: response.username
      })
    }, function() {
      $scope.loginFailed = true;
    });
  }
});
