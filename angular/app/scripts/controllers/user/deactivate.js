angular.module('bookSwitchApp').controller('UserDeactivateController', function(
  $scope,
  $state,
  $stateParams,
  User,
  SiteData
) {
  var user = new User();

  user.$get({username: $stateParams.username});

  $scope.deactivate = function() {
    user.active = false;

    // save active flag, then logout
    user.$update({
      username: $stateParams.username,
      token: SiteData.get('token')
    }, function(response) {
      $state.go('user.logout', {
        username: $stateParams.username,
        deactivated: true
      });
    });
  };
});
