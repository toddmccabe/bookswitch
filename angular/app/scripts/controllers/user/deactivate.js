angular.module('bookSwitchApp').controller('UserDeactivateController', function(
  $scope,
  $state,
  User,
  SiteData
) {
  var username = SiteData.get('username');
  var user = new User();

  $scope.deactivate = function() {
    user.active = false;

    // save active flag and logout
    user.$update({
      username: username,
      authentication_token: SiteData.get('authentication_token')
    }, function(response) {
      $state.go('user.logout', {
        username: username,
        deactivated: true
      });
    });
  };
});
