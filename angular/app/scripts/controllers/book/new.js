bookSwitchApp.controller('BookNewController', function($scope, $state, Book, Error, SiteData) {
  $scope.book = new Book();

  $scope.create = function() {
    $scope.book.$save({
      token: SiteData.get('token')
    }, function(response) {
      $state.go('book.show', {
        id: response.id,
        added: true
      });
    }, function(response) {
      $scope.errors = Error.parse(response.data.errors);
    });
  }
});
