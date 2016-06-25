angular.module('bookSwitchApp').controller('UserLogoutController', function(
  $scope,
  $stateParams,
  Session,
  SiteData
) {
  $scope.deactivated = $stateParams.deactivated;
  var session = new Session();

  session.$remove({
    username: SiteData.get('username'),
    id: SiteData.get('authentication_token')
  });

  SiteData.removeAll();
});
