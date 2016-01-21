bookSwitchApp.controller('BookShowController', function($scope, Book, $stateParams) {
  $scope.added = !!$stateParams.added;

  Book.get({id: $stateParams.id}, function(book) {
    $scope.book = book;
  })
});
