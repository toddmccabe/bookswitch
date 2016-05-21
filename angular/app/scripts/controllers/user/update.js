bookSwitchApp.controller('UserUpdateController', function($scope, $state, $stateParams, User, SiteData) {
  var user = new User();

  user.$get({
    id: $stateParams.id,
    token: SiteData.get('token')
  }, function(user) {
    $scope.user = user;
  });

  $scope.update = function() {
    user.$update({
      id: $stateParams.id,
      token: SiteData.get('token')
    }, function(response) {
      SiteData.set('username', response.username);

      $state.go('user.show', {
        id: response.username,
        updated: true
      });
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  };
});
