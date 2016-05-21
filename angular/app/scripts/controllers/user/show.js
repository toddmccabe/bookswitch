bookSwitchApp.controller('UserShowController', function($scope, $stateParams, User, SiteData) {
  $scope.updated = !!$stateParams.updated;

  User.get({id: $stateParams.id}, function(user) {
    $scope.user = user;
    $scope.isUser = $scope.user.username === SiteData.get('username');
  });
});
