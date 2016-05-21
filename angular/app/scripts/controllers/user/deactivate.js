bookSwitchApp.controller('UserDeactivateController', function($scope, $state, $stateParams, User, SiteData) {
  var user = new User();

  user.$get({id: $stateParams.id});

  $scope.deactivate = function() {
    user.active = false;

    // save active flag, then logout
    user.$update({
      id: $stateParams.id,
      token: SiteData.get('token')
    }, function(response) {
      $state.go('user.logout', {
        id: $stateParams.id,
        deactivated: true
      });
    });
  };
});
