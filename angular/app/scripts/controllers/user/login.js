bookSwitchApp.controller('UserLoginController', function($scope, $state, $stateParams, Session, SiteData) {
  var session = new Session();

  $scope.rememberMe = false;
  $scope.loginFailed = false;
  $scope.confirmed = $stateParams.confirmed;

  $scope.login = function() {
    // get actual values from input elements
    // two-way data binding is broken by autocomplete
    session.usernameEmail = $('#usernameEmail').val();
    session.password = $('#password').val();

    session.$save({}, function(response) {
      if($scope.rememberMe) {
        SiteData.set('saveToCookie', true);
      }

      SiteData.set('token', response.token);
      SiteData.set('username', response.username);

      $state.go('user.show', {
        username: response.username
      });
    }, function(response) {
      $scope.errors = response.data.error;
    });
  };
});
