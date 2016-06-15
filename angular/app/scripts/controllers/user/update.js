angular.module('bookSwitchApp').controller('UserUpdateController', function(
  $scope,
  $state,
  User,
  SiteData
) {
  var username = SiteData.get('username');
  var token = SiteData.get('token');
  var user = new User();

  user.$get({
    username: username,
    token: token
  }, function(user) {
    $scope.user = user;
  });

  $scope.update = function() {
    user.$update({
      username: username,
      token: token
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
