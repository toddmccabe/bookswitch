bookSwitchApp.controller('BookShowController', function($scope, $stateParams, Book) {
  $scope.added = $stateParams.added;

  Book.get({id: $stateParams.id}, function(book) {
    $scope.book = book;
  })
});
