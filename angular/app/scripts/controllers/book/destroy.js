bookSwitchApp.controller('BookDestroyController', function($scope, $state, $stateParams, Book, SiteData) {
  $scope.removed = false;

  $scope.destroy = function() {
    Book.delete({
      id: $stateParams.id,
      username: SiteData.get('username'),
      token: SiteData.get('token')
    }, function() {
      $scope.removed = true;
    });
  }
});
