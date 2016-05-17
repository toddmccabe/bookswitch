bookSwitchApp.controller('UserLogoutController', function($scope, $stateParams, Session, SiteData) {
  $scope.deactivated = !!$stateParams.deactivated;

  var session = new Session();

  session.$remove({id: SiteData.get('token')});
  SiteData.removeAll();
});
