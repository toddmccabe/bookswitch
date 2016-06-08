angular.module('bookSwitchApp').controller('UserUpdateController', function(
  $scope,
  $state,
  $stateParams,
  User,
  SiteData
) {
  var user = new User();

  user.$get({
    username: $stateParams.username,
    token: SiteData.get('token')
  }, function(user) {
    $scope.user = user;
  });

  $scope.update = function() {
    user.$update({
      username: $stateParams.username,
      token: SiteData.get('token')
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
