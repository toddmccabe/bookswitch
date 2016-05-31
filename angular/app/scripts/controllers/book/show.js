bookSwitchApp.controller('BookShowController', function($scope, $stateParams, Book, SiteData) {
  $scope.added = $stateParams.added;
  $scope.updated = $stateParams.updated;

  Book.get({id: $stateParams.id}, function(book) {
    $scope.book = book;
    $scope.isOwner = SiteData.get('username') == $scope.book.username;
  }, function(response) {
    $scope.errors = response.data.errors;
  });
});
