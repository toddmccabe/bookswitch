angular.module('bookSwitchApp').controller('UserLogoutController', function(
  $scope,
  $stateParams,
  Session,
  SiteData
) {
  $scope.deactivated = $stateParams.deactivated;
  var token = SiteData.get('token');
  var session = new Session();

  if(token)
    session.$remove({id: token});

  SiteData.removeAll();
});
