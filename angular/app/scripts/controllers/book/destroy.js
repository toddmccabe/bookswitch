angular.module('bookSwitchApp').controller('BookDestroyController', function(
  $scope,
  $state,
  $stateParams,
  Book,
  SiteData
) {
  $scope.removed = false;

  $scope.destroy = function() {
    Book.delete({
      id: $stateParams.id,
      username: SiteData.get('username'),
      authentication_token: SiteData.get('authentication_token')
    }, function() {
      $scope.removed = true;
    });
  };
});
