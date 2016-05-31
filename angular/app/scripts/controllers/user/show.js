bookSwitchApp.controller('UserShowController', function($scope, $stateParams, User, SiteData) {
  // todo: make conversation and book pagination/sorting parameters play nicely together
  $scope.updated = $stateParams.updated;

  User.get({
    username: $stateParams.username
  }, function(response) {
    $scope.user = response;
    $scope.isUser = $scope.user.username === SiteData.get('username');
  }, function() {
    // otherwise show error
    $scope.errors = 'That user could not be found.';
  });
});
