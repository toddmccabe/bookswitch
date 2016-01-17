bookSwitchApp.controller('UserLogoutController', function($scope, $stateParams, SiteData) {
  $scope.deactivated = !!$stateParams.deactivated;

  SiteData.removeAll();
});
