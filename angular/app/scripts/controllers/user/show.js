bookSwitchApp.controller('UserShowController', function($scope, $stateParams, User, SiteData) {
  var user = new User();

  $scope.isUser = false;
  $scope.updated = !!$stateParams.updated;

  user.$get({id: $stateParams.id}, function(response) {
    $scope.user = response;
    $scope.isUser = $scope.user.username === SiteData.get('username');
  });
});
