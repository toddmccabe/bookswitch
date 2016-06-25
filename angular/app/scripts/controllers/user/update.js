angular.module('bookSwitchApp').controller('UserUpdateController', function(
  $scope,
  $state,
  User,
  SiteData
) {
  var username = SiteData.get('username');
  var authentication_token = SiteData.get('authentication_token');
  var user = new User();

  user.$get({
    username: username,
    authentication_token: authentication_token
  }, function(user) {
    $scope.user = user;
  });

  $scope.update = function() {
    user.$update({
      username: username,
      authentication_token: authentication_token
    }, function(response) {
      SiteData.set('username', response.username);

      $state.go('user.show', {
        username: response.username,
        updated: true
      });
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  };
});
