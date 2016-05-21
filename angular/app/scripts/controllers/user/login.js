bookSwitchApp.controller('UserLoginController', function($scope, $state, $stateParams, Session, SiteData) {
  var session = new Session();

  $scope.usernameEmail = '';
  $scope.password = '';
  $scope.rememberMe = false;
  $scope.loginFailed = false;
  $scope.confirmed = $stateParams.confirmed;

  $scope.login = function() {
    session.usernameEmail = $scope.usernameEmail;
    session.password = $scope.password;

    session.$save({
    }, function(response) {
      if($scope.rememberMe) {
        SiteData.set('saveToCookie', true);
      }

      SiteData.set('token', response.token);
      SiteData.set('username', response.username);

      $state.go('user.show', {
        id: response.username
      });
    }, function(response) {
      $scope.errors = response.data.error;
    });
  };
});
