angular.module('bookSwitchApp').controller('BookUpdateController', function(
  $scope,
  $state,
  $stateParams,
  Book,
  SiteData
) {
  $scope.book = new Book();

  $scope.book.$get({id: $stateParams.id});

  $scope.update = function() {
    $scope.book.$update({
      id: $scope.book.id,
      username: SiteData.get('username'),
      authentication_token: SiteData.get('authentication_token')
    }, function() {
      $state.go('book.show', {
        id: $stateParams.id,
        updated: true
      });
    }, function(response) {
      $scope.errors = response.data.errors;
    });
  };
});
